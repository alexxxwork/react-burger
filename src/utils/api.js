import { TOKEN_PATH, API_BASE } from './constants';

export const checkResponse = (res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const refreshToken = () =>
    fetch(`${API_BASE}${TOKEN_PATH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }).then(checkResponse);

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
            const refreshData = await refreshToken(); // обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem(
                'accessToken',
                refreshData.accessToken.replace('Bearer ', '')
            );
            const res = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    authorization: `Bearer ${refreshData.accessToken}`,
                },
            });
            // повторяем запрос
            return checkResponse(res);
        }
        delete localStorage.refreshToken;
        return Promise.reject(err);
    }
};

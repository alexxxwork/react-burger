import { TOKEN_PATH, API_BASE } from './constants';

export const checkResponse = (res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export function request(url, options) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(checkResponse);
}

export const refreshToken = () =>
    request(`${API_BASE}${TOKEN_PATH}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    });

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === 'jwt expired') {
            // || err.message === 'jwt malformed') {
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
        return Promise.reject(err);
    }
};

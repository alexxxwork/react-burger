import { Route } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children, ...rest }) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...rest} render={() => children} />;
}

export default ProtectedRoute;

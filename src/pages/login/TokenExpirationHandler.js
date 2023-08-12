import jwt_decode from 'jwt-decode';

export const TokenExpirationHandler = (callback) => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
        // No token found, execute the callback for redirection
        callback();
        return;
    }

    const token = JSON.parse(storedToken).access_token;

    // Decode the token and check its expiration
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        // Token has expired, clear local storage and execute the callback for redirection
        localStorage.removeItem('token');
        callback();
    }
};

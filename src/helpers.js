// save login repsonse to session sessionStorage
export const authenticate = (response, next) => {
    if(window !== 'undefined') {
        console.log('authenticate', response)
        sessionStorage.setItem('token', JSON.stringify(response.data.accessToken))
        sessionStorage.setItem('user', JSON.stringify(response.data.name))
    }
    next();
};
// access token name from sessionstorage
export const getToken = () => {
    if(window !== 'undefined') {
        if (sessionStorage.getItem('token')) {
            return JSON.parse(sessionStorage.getItem('token'))
        } else {
            return false;
        }
    }
};

// access user name from sessionstorage
export const getUser = () => {
    if(window !== 'undefined') {
        if (sessionStorage.getItem('user')) {
            return JSON.parse(sessionStorage.getItem('user'))
        } else {
            return false;
        }
    }
};
// access token from session sessionStorage
export const logout = (next) => {
    if(window !== 'undefined') {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
    }
    next();
};

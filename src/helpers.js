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
        if (sessionStorage.getItem('email')) {
            return JSON.parse(sessionStorage.getItem('email'))
        } else {
            return false;
        }
    }
};


// access token from session sessionStorage
export const logout = (next) => {
    if(window !== 'undefined') {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('isAdmin')
    }
    next();
};

export const isAdmin = async () => {
    if (window !== "undefined") {
      if (getUser()) {
        const email = getUser()
        
        await fetch('http://localhost:4000/admin', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            })
        })
        .then(response => {
            return response.json()
        }).then(data => {

          // JSON.parse(sessionStorage.getItem('token'))
          
            if (data.isAdmin) {
                return true
            } else if (!data.isAdmin){
                return false
            }
          
        })
        .catch(error => console.log(error))

      } else if (!getUser()){
          return false
      }
    }
  };


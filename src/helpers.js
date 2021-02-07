const jwt = require('jsonwebtoken')

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
export const verifyToken = () => {
    if(window !== 'undefined') {
        if (sessionStorage.getItem('token')) {
            const sessionToken = JSON.parse(sessionStorage.getItem('token'));

            try {
                const verifiedUser = jwt.verify(sessionToken, "1574cea9a9c3f8dfed8ce616dfb0b97726c38371f526f0ce0a26db2be2e0144780a15e8f6ff3a9153137ad758050ac576c2860d3624b5e25a4b5ec10993748eb")
                return verifiedUser;
            } catch {
                return false;
            }

        } else {
            console.log("No Session Token")
            return false
        }
    }
};

// access user name from sessionstorage
export const getUser = () => {
    if(window !== 'undefined') {
        if (sessionStorage.getItem('token')) {
            const sessionToken = JSON.parse(sessionStorage.getItem('token'));

            try {
                const authenticatedUser = jwt.verify(sessionToken, "1574cea9a9c3f8dfed8ce616dfb0b97726c38371f526f0ce0a26db2be2e0144780a15e8f6ff3a9153137ad758050ac576c2860d3624b5e25a4b5ec10993748eb")
                return authenticatedUser.email;
            } catch {
                return false;
            }

        } else {
            console.log("No Session Token")
            return false
        }
    }
};


// access token from session sessionStorage
export const logout = (next) => {
    if(window !== 'undefined') {
        sessionStorage.removeItem('token')
    }
    next();

};
    

export const isAdmin = () => {
    if(window !== 'undefined') {
        if (sessionStorage.getItem('token')) {
            const sessionToken = JSON.parse(sessionStorage.getItem('token'));

            try {
                const authenticatedUser = jwt.verify(sessionToken, "1574cea9a9c3f8dfed8ce616dfb0b97726c38371f526f0ce0a26db2be2e0144780a15e8f6ff3a9153137ad758050ac576c2860d3624b5e25a4b5ec10993748eb")
                console.log(authenticatedUser)
                
                return authenticatedUser.isAdmin;
            } catch {
                return false;
            }

        } else if (!sessionStorage.getItem('token')) {
            console.log("No session token!")
            return false
        }
    }
}




// OLD ISADMIN CHEKCER -> LEAVE FOR REFERENCE

// export const isAdmin = async () => {
//     if (window !== "undefined") {
//       if (getUser()) {
//         const email = getUser()
        
//         await fetch('http://localhost:4000/admin', {
//             method:'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: email,
//             })
//         })
//         .then(response => {
//             return response.json()
//         }).then(data => {

//           // JSON.parse(sessionStorage.getItem('token'))
          
//             if (data.isAdmin) {
//                 return true
//             } else if (!data.isAdmin){
//                 return false
//             }
          
//         })
//         .catch(error => console.log(error))

//       } else if (!getUser()){
//           return false
//       }
//     }
//   };

//
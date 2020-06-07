const fakeAuth = {
    isAuthenticated() {
      return localStorage.getItem('localAuth')=='true'?true:false;
    },
    role() {
      return localStorage.getItem('role');
    },
    authenticate(cb) {
      localStorage.setItem('localAuth', 'true');
      localStorage.setItem('role', 'admin');
      setTimeout(cb, 100)
    },
    signout(cb) {
      localStorage.setItem('localAuth', 'false');
      localStorage.setItem('role', '');
      setTimeout(cb, 100)
    }
  }

export default fakeAuth;


// class Auth {
//   constructor() {
//       this.authenticated = false;
//   }

//   login() {
//       this.authenticated = true;
//   }

//   logout() {
//       this.authenticated = false;
//   }

//   isAuthenticated() {
//       return this.authenticated;
//   }
// }

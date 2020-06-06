class Auth {
    constructor() {
        this.authenticated = false;
    }

    login() {
        this.authenticated = true;
    }

    logout() {
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

const fakeAuth = {
    isAuthenticated() {
      return localStorage.getItem('localAuth')=='true'?true:false;
    },
    authenticate(cb) {
      localStorage.setItem('localAuth', 'true');
      setTimeout(cb, 100)
    },
    signout(cb) {
      localStorage.setItem('localAuth', 'false');
      setTimeout(cb, 100)
    }
  }

export default fakeAuth;
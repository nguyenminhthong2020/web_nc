const fakeAuth = {
    isAuthenticated() {
      return localStorage.getItem('localAuth')=='true'?true:false;
    },
    role() {
      return localStorage.getItem('role');
    },
    authenticate(role) {
      localStorage.setItem('localAuth', 'true');
      localStorage.setItem('role', role);
      // setTimeout(cb, 100)
    },
    signout(cb) {
      localStorage.setItem('localAuth', 'false');
      localStorage.setItem('role', '');
      setTimeout(cb, 100)
    }
  }

export default fakeAuth;
const fakeAuth = {
    isAuthenticated() {
        return localStorage.getItem('localAuth') == 'true' ? true : false;
    },
    role() {
        return localStorage.getItem('role');
    },
    authenticate(role) {
        localStorage.setItem('localAuth', 'true');
        // localStorage.setItem('role', role);
        // role: 0 - customer, 1 - employee, 2 - admin
        switch (role) {
            case 0:
                localStorage.setItem('role', 'customer');
                break;
            case 1:
                localStorage.setItem('role', 'employee');
                break;
            case 2:
                localStorage.setItem('role', 'admin');
                break;
            default:
                alert('Exception');

        }
        // setTimeout(cb, 100)
    },
    signout(cb) {
        localStorage.setItem('localAuth', 'false');
        localStorage.setItem('role', '');
        setTimeout(cb, 100)
    }
}

export default fakeAuth;

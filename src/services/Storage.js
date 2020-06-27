const LocalStorage = {
    /**
    * Save session to local storage
    */
    saveLocalStorage: session => {
        localStorage.setItem('session', JSON.stringify(session));
    },
    /**
    * Retrieve session from local storage
    */
    readLocalStorage: () => {
        const session = localStorage.getItem('session');
        return JSON.parse(session);
    },
    /**
     * Token
     */
    readTokenStorage: () => {
        const token = localStorage.getItem('x-auth-token');
        return token;
    },
    /**
    * Clear local storage
    */
    clearLocalStorage: () => {
        localStorage.clear();
    }
}

export default LocalStorage;
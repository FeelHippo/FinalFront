const LocalStorage = {
    /**
    * Save session to local storage
    */
    saveLocalStorage: session => {
        localStorage.setItem('FeelHip_API', JSON.stringify(session));
    },
    /**
    * Retrieve session from local storage
    */
    readLocalStorage: () => {
        const session = localStorage.getItem('FeelHip_API');
        return JSON.parse(session);
    },
    /**
    * Clear local storage
    */
    clearLocalStorage: () => {
        localStorage.clear();
    }
}

export default LocalStorage;
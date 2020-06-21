export default class Session {
    /**
     * constructor
     */
    constructor(
        currentUser = '',
        currentPwd = '',
        success = false
    ) {
        this.currentUser = currentUser;
        this.currentPwd = currentPwd;
        this.success = success;
    }
}
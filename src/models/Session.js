export default class Session {
    /**
     * constructor
     */
    constructor(
        email = '',
        password = '',
        success = false,
        token = '',
        error = '',
    ) {
        this.email = email;
        this.password = password;
        this.success = success;
        this.token = token;
        this.error = error;
    }
}
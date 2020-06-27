export default class Session {
    /**
     * constructor
     */
    constructor(
        username = '',
        email = '',
        password = '',
        success = false,
        token = '',
        error = '',
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.success = success;
        this.token = token;
        this.error = error;
    }
}
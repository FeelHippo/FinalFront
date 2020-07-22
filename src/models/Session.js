export default class Session {
    /**
     * constructor
     */
    constructor(
        username = '',
        email = '',
        password = '',
        token = '',
        error = '',
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.token = token;
        this.error = error;
    }
}
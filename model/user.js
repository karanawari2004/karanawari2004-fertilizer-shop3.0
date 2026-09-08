const db = require('../utils/databaseUtils');

const ensureUsersTable = () => db.execute(`
    CREATE TABLE IF NOT EXISTS airbnb.users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        location VARCHAR(255) NULL
    )
`);

module.exports = class User {
    constructor(username, password, location) {
        this.username = username;
        this.password = password;
        this.location = location;
    }

    static findByCredentials(username, password) {
        return ensureUsersTable().then(() => db.execute(
                'SELECT * FROM airbnb.users WHERE username = ? AND password = ?',
                [username, password]
            ));
    }

    save() {
        return ensureUsersTable().then(() => db.execute(
                'INSERT INTO airbnb.users (username, password, location) VALUES (?, ?, ?)',
                [this.username, this.password, this.location || null]
            ));
    }
};

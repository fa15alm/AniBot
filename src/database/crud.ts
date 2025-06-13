const db = require('./database');

interface User {
    id: number;
}

interface Guild {
    id: number;
    prefix: string;
}

// ADD
const addUser = (id: number, callback: (error: Error | null, user?: User) => void) => {
    const sql = `INSERT INTO users (id, prefix) VALUES (?)`
    db.run(sql, [id], function(err:Error) {
        callback(err, { id })
    });
};
const addGuild = (id: number, prefix:string, callback: (error: Error | null, guild?: Guild) => void) => {
    const sql = `INSERT INTO guilds (id, prefix) VALUES (?, ?)`
    db.run(sql, [id, prefix], function(err:Error) {
        callback(err, { id, prefix})
    });
};

// DELETE
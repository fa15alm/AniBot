import * as sqlite3 from 'sqlite3';
import * as path from 'node:path';
const dbName =  '../../data/database.db';
const dbPath = path.resolve(__dirname, dbName);
const db = new sqlite3.Database(dbPath, (err) => {
    if(err){
        console.error(err.message);
        return;
    }else{
        console.log('Connected to guilds database');
        db.run('CREATE TABLE IF NOT EXISTS guilds (id INTEGER PRIMARY KEY, prefix TEXT)', (err) => {
            if(err){
                console.error('Error creating guilds table');
            } else {
                console.log('Guilds table is ready');
            }
        });
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY)', (err) => {
            if(err){
                console.error('Error creating users table');
            } else {
                console.log('Users table is ready');
            }
        });
    }
});

export default db;
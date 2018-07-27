process.env.NODE_ENV = 'test';

import users from './createUserTable';
import entries from './createEntryTable';
import dummyUsers from '../seeders/seed-users';
import dummyEntries from '../seeders/seed-entries';
import pool from '../model/dbConfig';

console.log(pool)

users();
setTimeout(entries, 500);
setTimeout(dummyUsers, 1000);
setTimeout(dummyEntries, 1500);

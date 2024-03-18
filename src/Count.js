// Imports
import pg from 'pg'
import { req } from './req.js'
/**
 * Counter abstract class
 * @param {string} a table name in DB (required)
 */
export class Count {
    constructor(a) {
        const b = new pg.Client({
            database: process.env.pg_db,
            password: process.env.pg_p,
            user: process.env.pg_u
        }),
            c = this
        c.cache = 10;
        b.connect().then(() => {
            b.query('select subscount from ' + a).then(a => {
                if (a.rowCount)
                    c.cache = a.rows[0].subscount
                b.end()
            }).catch(() => {

            })
        }).catch(() => {

        })
    }
    /**
     * Get the value (abstract method)
     * @param {object} a params (must have url)
     * @returns {*} data requested from url
     */
    async get(a) {
        if ('object' == typeof a
         && 'string' == typeof a.url)
            return await req(a)
    }
}
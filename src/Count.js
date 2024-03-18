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
        Object.defineProperties(c, {
            cache: {
                configurable: true,
                value: 0
            },
            table: {
                value: a
            }
        })
        b.connect().then(() => {
            b.query('select subscount from ' + c.table).then(a => {
                if (a.rowCount)
                    Object.defineProperty(c, 'cache', {
                        configurable: true,
                        value: a.rows[0].subscount
                    })
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
    /**
     * Stores the value in DB (must be called inside overriden get() method)
     * @param {number} a new value 
     */
    async store(a) {
        if ('number' == typeof parseInt(a)
         && !isNaN(a)) {
            a = parseInt(a)
            if (a != this.cache) {
                const b = new pg.Client({
                    database: process.env.pg_db,
                    password: process.env.pg_p,
                    user: process.env.pg_u
                })
                try {
                    await b.connect()
                    await b.query(`update ${this.table} set subscount=${a} where subscount=${this.cache}`)
                    await b.end()
                } catch (a) {

                }
                Object.defineProperty(this, 'cache', {
                    configurable: true,
                    value: a
                })
            }
        }
    }
}
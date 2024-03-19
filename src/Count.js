// Imports
import pg from 'pg'
import { req } from './req.js'
/**
 * Counter abstract class
 * @param {Array} a table names in DB (required)
 */
export class Count {
    constructor(a) {
        const b = new pg.Client({
            database: process.env.pg_db,
            password: process.env.pg_p,
            user: process.env.pg_u
        }),
            c = this,
            d = 0
        Object.defineProperties(c, {
            cache: {
                value: []
            },
            tables: {
                value: a
            }
        })
        for (let a in c.tables)
            Object.defineProperty(c.cache, a, {
                configurable: true,
                value: 0
            })
        b.connect().then(() => {
            b.query('select subscount from ' + c.tables[d]).then(a => {
                if (a.rowCount)
                    Object.defineProperty(c.cache, d, {
                        configurable: true,
                        value: a.rows[0].subscount
                    })
                if (d == c.cache.length-1)
                    b.end()
                else
                    d++
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
     * @param {Array} a new values 
     */
    async store(a) {
        if (a instanceof Array
         && a.length)
            for (let b in a)
                if ('number' == typeof parseInt(a[b])
                 && !isNaN(a[b])) {
                    a[b] = parseInt(a[b])
                    if (a != this.cache[b]) {
                        const c = new pg.Client({
                            database: process.env.pg_db,
                            password: process.env.pg_p,
                            user: process.env.pg_u
                        })
                        try {
                            await c.connect()
                            await c.query(`update ${this.tables[b]} set subscount=${a[b]} where subscount=${this.cache[b]}`)
                            await c.end()
                        } catch (a) {
                        
                        }
                        Object.defineProperty(this.cache, b, {
                            configurable: true,
                            value: a[b]
                        })
                    }
                }
    }
}
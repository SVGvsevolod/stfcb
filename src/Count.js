// Imports
import pg from 'pg'
import { req } from './req.js'
/**
 * Counter abstract class
 * @param {Array} a table names in DB (required)
 */
export class Count {
    constructor(a) {
        Object.defineProperties(this, {
            cache: {
                value: []
            },
            tables: {
                value: a
            }
        })
        for (let a in this.tables)
            Object.defineProperty(this.cache, a, {
                configurable: true,
                value: 0
            })
        this.#a()
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
     * Stores the value in the DB (must be called inside overriden get() method)
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
    /**
     * Private method for retrieving values from the DB
     */
    async #a() {
        const a = new pg.Client({
            database: process.env.pg_db,
            password: process.env.pg_p,
            user: process.env.pg_u
        })
        try {
            await a.connect()
        } catch(a) {

        }
        for (let b in this.tables)
            try {
                const c = await a.query('select subscount from ' + this.tables[b])
                if (c.rowCount)
                    Object.defineProperty(this.cache, b, {
                        configurable: true,
                        value: c.rows[0].subscount
                    })
            } catch(a) {

            }
        try {
            await a.end()
        } catch(a) {
            
        }
    }
}
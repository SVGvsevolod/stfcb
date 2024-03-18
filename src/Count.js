// Imports
import { req } from './req.js'
/**
 * Counter abstract class
 */
export class Count {
    constructor() {
        this.cache = 0;
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
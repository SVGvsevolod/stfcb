// Imports
import { Count } from './../Count.js'
/**
 * Inherited counter class for VK subscriber count
 * @param {object} a params (must have body for requests)
 */
export class VKSC extends Count {
    constructor(a) {
        super()
        this.body = 'object' == typeof a
            && 'string' == typeof a.body
            ? a.body
            : undefined
    }
    /**
     * Overriden method for requesting subs count
     */
    async get() {
        const a = JSON.parse(await super.get({
            body: this.body,
            method: 'POST',
            mime: 'application/x-www-form-urlencoded',
            url: 'https://api.vk.com/method/users.getFollowers'
        }))
        if ('object' == typeof a.response
         && 'number' == typeof a.response.count)
            this.cache = a.response.count
    }
}
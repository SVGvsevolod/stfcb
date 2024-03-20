// Imports
import { Count } from './../Count.js'
/**
 * Inherited counter class for VK subscriber count
 * @param {object} a params (must have credentials for requests)
 */
export class VKSC extends Count {
    constructor(a) {
        super('object' == typeof a
            && a.tables instanceof Array
            && a.tables.length
            ? a.tables
            : undefined)
        Object.defineProperties(this, {
            ids: {
                value: 'object' == typeof a
                    && a.ids instanceof Array
                    && a.ids.length
                    ? a.ids
                    : undefined
            },
            key: {
                value: 'object' == typeof a
                    && 'string' == typeof a.key
                    ? a.key
                    : undefined
            }
        })
    }
    /**
     * Overriden method for requesting subs count
     */
    async get() {
        let a = []
        for (let b in this.ids) {
            const c = JSON.parse(await super.get({
                body: `access_token=${this.key}&count=0&user_id=${this.ids[b]}&v=5.199`,
                method: 'POST',
                mime: 'application/x-www-form-urlencoded',
                url: 'https://api.vk.com/method/users.getFollowers'
            }))
            if ('object' == typeof c.response
             && 'number' == typeof c.response.count)
                a[b] = c.response.count
        }
        this.store(a)
    }
}
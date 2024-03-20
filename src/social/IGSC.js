// Imports
import { Count } from './../Count.js'
/**
 * Inherited counter class for Instagram subscriber count
 * @param {object} a params (must have credentials for requests)
 */
export class IGSC extends Count {
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
                url: `https://graph.facebook.com/v19.0/17841405822304914?access_token=${this.key}&fields=biography%2Cid%2Cusername%2Cwebsite`
                //url: `https://graph.facebook.com/v19.0/${this.ids[b]}?access_token=${this.key}&fields=followers_count`
            }))
            console.log(c)
        }
    }
}
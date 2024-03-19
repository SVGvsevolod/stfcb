// Imports
import { Count } from './../Count.js'
/**
 * Inherited counter class for YouTube subscriber count
 * @param {object} a params (must have credentials for requests)
 */
export class YTSC extends Count {
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
        let a = ''
        for (let b in this.ids)
            a += '&id=' + this.ids[b]
        const b = JSON.parse(await super.get({
            url: `https://content-youtube.googleapis.com/youtube/v3/channels?part=statistics${a}&key=${this.key}`
        }))
        if (b.items instanceof Array
         && b.items.length) {
            let a = [0, 0, 0]
            for (let c in b.items)
                if ('object' == typeof b.items[c]
                 && 'object' == typeof b.items[c].statistics
                 && !b.items[c].statistics.hiddenSubscriberCount
                 && 'number' == typeof parseInt(b.items[c].statistics.subscriberCount))
                    switch(b.items[c].id) {
                        case this.ids[0]:
                            a[0] = parseInt(b.items[c].statistics.subscriberCount)
                            break;
                        case this.ids[1]:
                            a[1] = parseInt(b.items[c].statistics.subscriberCount)
                            break;
                        case this.ids[2]:
                            a[2] = parseInt(b.items[c].statistics.subscriberCount)
                    }
            this.store(a)
        }
    }
}
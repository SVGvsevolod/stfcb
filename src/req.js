// Imports
import { request } from 'node:https'
/**
 * HTTP request function
 * @param {object} a params (must have url)
 * @returns {*} requested data
 */
export function req(a) {
    return new Promise((b, c) => {
        if ('object' != typeof a
         || 'object' == typeof a && 'string' != typeof a.url)
            c(new Error('No URL and method specified'))
        else {
            let d = ''
            const e = Object.create(null)
            e['User-Agent'] = 'stfcb (https://svg.moe/)'
            if ('string' == typeof a.mime)
                e['Content-Type'] = a.mime
            const f = request(a.url, {
                headers: e,
                method: 'string' == typeof a.method ? a.method : 'GET'
            }, a => {
                a.on('data', a => {
                    d += a.toString()
                })
                a.on('end', () => {
                    console.log(a)
                    b(d)
                })
            })
            f.removeHeader('Connection')
            f.removeHeader('Transfer-Encoding')
            f.end(a.body)
        }
    })
}
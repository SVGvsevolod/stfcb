// Imports
import { request } from 'node:https'
/**
 * Custom HTTP request function
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
            if ('object' == typeof a.headers)
                for (let b in Object.keys(a.headers))
                    e[Object.keys(a.headers)[b]] = a.headers[Object.keys(a.headers)[b]]
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
// Imports
import { request } from 'node:https'
// Global stuff declaration
global.req = a => {
    return new Promise((b, c) => {
        if ('object' != typeof a 
         || 'object' == typeof a && 'string' != typeof a.method
         && 'object' == typeof a && 'string' != typeof a.url)
            c(new Error('No URL and method specified'))
        else {
            let d = ''
            const e = Object.create(null)
            e['User-Agent'] = 'stfcb (https://svg.moe/)'
            if ('string' == typeof a.mime)
                e['Content-Type'] = a.mime
            const f = request(a.url, {
                headers: e,
                method: a.method
            }, a => {
                a.on('data', a => {
                    d += a.toString()
                })
                a.on('end', () => {
                    b(d)
                })
            })
            f.removeHeader('Connection')
            f.removeHeader('Transfer-Encoding')
            f.end(a.body)
        }
    })
}
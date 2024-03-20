// Imports
import { config } from 'dotenv'
import { IGSC } from './social/IGSC.js'
import { VKSC } from './social/VKSC.js'
import { YTSC } from './social/YTSC.js'
import { loop } from './loop.js'
// Laoding env vars
config()
// Defining counters
global.ig_sc = new IGSC({
    ids: JSON.parse(process.env.ig_u),
    key: process.env.ig_k,
    tables: JSON.parse(process.env.ig_t)
})
global.vk_sc = new VKSC({
    ids: JSON.parse(process.env.vk_u),
    key: process.env.vk_k,
    tables: JSON.parse(process.env.vk_t)
})
global.yt_sc = new YTSC({
    ids: JSON.parse(process.env.yt_u),
    key: process.env.yt_k,
    tables: JSON.parse(process.env.yt_t)
})
// Logging process termination
process.on('exit', a => {
    process.stdout.write(`(${a}) by\n`)
})
// Interaction via Std
process.stdin.on('data', a => {
    switch (a.toString()) {
        case 'exit\n':
        case 'quit\n':
            process.exit()
    }
})
// Start the loop
//setInterval(loop, 5000)
ig_sc.get()
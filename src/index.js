// Imports
import { config } from 'dotenv'
import { VKSC } from './social/VKSC.js'
import { YTSC } from './social/YTSC.js'
import { loop } from './loop.js'
// Laoding env vars
config()
// Defining counters
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
setInterval(loop, 5000)
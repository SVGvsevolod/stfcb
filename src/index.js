// Imports
import { config } from 'dotenv'
import { VKSC } from './social/VKSC.js'
import { loop } from './loop.js'
// Laoding env vars
config()
// Defining counters
global.vk_sc = new VKSC({
    body: `access_token=${process.env.vk_k}&user_id=${process.env.vk_u}&v=${process.env.vk_v}`,
    table: process.env.vk_t
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
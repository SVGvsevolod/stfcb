// Imports
import { config } from 'dotenv'
import { loop } from './loop.js'
// Laoding env vars
config()
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
// Imports
import { IGSC } from './social/IGSC.js'
import { VKSC } from './social/VKSC.js'
import { YTSC } from './social/YTSC.js'
// Counters
const counts = {}
/**
 * Main loop
 */
export function loop() {
    if (!(counts.ig_sc instanceof IGSC))
        counts.ig_sc = new IGSC({
            ids: JSON.parse(process.env.ig_u),
            key: process.env.ig_k,
            tables: JSON.parse(process.env.ig_t)
        })
    //else
        //counts.ig_sc.get()
    if (!(counts.vk_sc instanceof VKSC))
        counts.vk_sc = new VKSC({
            ids: JSON.parse(process.env.vk_u),
            key: process.env.vk_k,
            tables: JSON.parse(process.env.vk_t)
        })
    //else
        //counts.vk_sc.get()
    if (!(counts.yt_sc instanceof YTSC))
        counts.yt_sc = new YTSC({
            ids: JSON.parse(process.env.yt_u),
            key: process.env.yt_k,
            tables: JSON.parse(process.env.yt_t)
        })
    //else
        //counts.yt_sc.get()
}
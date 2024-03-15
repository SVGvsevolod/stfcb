export async function vk_sc() {
    console.log(vk_sc.cache)
    console.log(await req({
        body: `access_token=${process.env.vk_k}&user_id=${process.env.vk_u}&v=${process.env.vk_v}`,
        method: 'POST',
        mime: 'application/x-www-form-urlencoded',
        url: 'https://api.vk.com/method/users.getFollowers'
    }))
    console.log(vk_sc.cache)
}
vk_sc.cache = 0
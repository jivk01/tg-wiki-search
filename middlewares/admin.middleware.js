module.exports = async (ctx, next) => {
    if (!process.env.ADMIN) return console.log(`Admin's id is not specified in the .env file`)
    if (ctx.from.id == process.env.ADMIN) next()
    else return
}
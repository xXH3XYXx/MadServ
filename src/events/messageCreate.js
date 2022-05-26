const prefix = "+"
module.exports = {
	name: "messageCreate",
    once: true,
	execute(msg) {
        if(msg.author.bot) return
        if(!msg.content.startsWith(prefix)) return

        const commandBody = msg.content.slice(prefix.length)

        const command = commandBody.toLowerCase()
        
        if (command === 'test') {
            msg.reply('test')
        }
    }
}
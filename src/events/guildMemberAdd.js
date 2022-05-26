const Discord = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        const newMemberEmbed = new Discord.MessageEmbed()
            .setColor("#d81e5b")
            .setTitle("New Member")
            .setDescription(`${member.user} Has Joined.`)
            .setThumbnail(member.user.displayAvatarURL());

            member.guild.channels.cache.get("972270534744244234").send({
                embeds: [newMemberEmbed]
            })
    }
}
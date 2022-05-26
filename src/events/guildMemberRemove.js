const Discord = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    async execute(member) {
        const newMemberEmbed = new Discord.MessageEmbed()
            .setColor("#d81e5b")
            .setTitle("New Member")
            .setDescription(`${member.user} Has left the guild`)
            .setThumbnail(member.user.displayAvatarURL())
            .addFields( 
                { name: "Member ID:", value: `${member.id}` }
                )

            member.guild.channels.cache.get("972270534744244234").send({
                embeds: [newMemberEmbed]
            })
    }
}
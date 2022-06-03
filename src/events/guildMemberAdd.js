const Discord = require("discord.js");
const GuildSettings = require("../models/GuildSettings.js");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {

        const guildSettings = await GuildSettings.findOne({ guild: member.guild.id });
        if (!guildSettings && !guildSettings.welcome_channel_id) {
            return;
        }

        const newMemberEmbed = new Discord.MessageEmbed()
            .setColor("#d81e5b")
            .setTitle("New Member")
            .setDescription(`${member.user} Has Joined.`)
            .setThumbnail(member.user.displayAvatarURL());

            member.guild.channels.cache.get(guildSettings.welcome_channel_id).send({
                embeds: [newMemberEmbed]
            })
    }
}
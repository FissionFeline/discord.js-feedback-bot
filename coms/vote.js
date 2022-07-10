module.exports = {
    name: "vote",
    description: "Creates a new embed",
    usage: '>embed_create "titel" "Description"',
    trigger: "here",
    category: "Stuff",
    async execute(client, msg, args) {
        const member = await msg.guild.members.fetch(msg.author.id)

        if (!member.roles.cache.some(role => role.id === "958429115684376576")) return msg.reply("Only staff members can use this command");

        const vote_item = msg.content.substring(msg.content.indexOf('-vote ') + 1)

        if (vote_item == "-vote") return msg.reply("Enter soemthing")

        const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('approve_suggest')
                .setLabel('I LIKE IT!')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('deny_suggest')
                .setLabel('Dont like it')
                .setStyle('DANGER'),
            );
        const Verfication_embed = new MessageEmbed()
            .setColor("#4287f5")
            .setTitle("Suggestion")
            .setDescription(vote_item)
            .setFooter(`Vote for democracy`)
        const channel = await msg.guild.channels.fetch(client.config.feedback_channel)
        msg.channel.send({ embeds: [Verfication_embed], components: [row] })
            .then(message => (channel.threads.create({ name: message.id, autoArchiveDuration: 60, reason: 'New channel for suggestions', })))
    }
}
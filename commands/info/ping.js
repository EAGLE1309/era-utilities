const {
  Message,
  Client,
  MessageEmbed,
  MessageActionRow,
  CommandInteraction,
  MessageButton
} = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: "ping",
  aliases: ['ping'],
  usage: " ",
  cooldown: '5s',
  run: async (client, message, args) => {
    const greenE = '<:network:891611745251127377>';
    const ping = await client.ws.ping;

    /*==================== EXECUTION & EMBEDS ====================*/
    const embed = new MessageEmbed()
    .setTitle('Pong!')
    .setDescription(`${greenE} ${ping}ms!`)
    .setColor(config.cGreen)
    .setTimestamp();

    message.channel.send({
      embeds: [embed]
    }).then(async(msg) => {
      await wait(4000);
      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel(`Retested: ${client.ws.ping}ms`)
        .setStyle('SECONDARY')
        .setCustomId('id')
        .setDisabled(true)
      );

      await wait(5000);
      msg.edit({
        components: [row]
      });
    });

  },
};
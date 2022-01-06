const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "ping",
  description: "returns websocket ping",
  type: 'CHAT_INPUT',

  run: async (client, interaction, args) => {
    const greenE = '<:network:891611745251127377>';
    const ping = await client.ws.ping;

    /*==================== EXECUTION & EMBEDS ====================*/
    const embed = new MessageEmbed()
    .setTitle('Pong!')
    .setDescription(`${greenE} ${ping}ms!`)
    .setColor(config.cGreen)
    .setTimestamp();

    interaction.deferReply({
      ephemeral: false
    });

    interaction.followUp({
      embeds: [embed]
    });
  },
};
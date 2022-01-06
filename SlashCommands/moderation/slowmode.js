const {
  Client,
  Permissions,
  CommandInteraction,
  MessageActionRow,
  MessageButton
} = require("discord.js");
config = require("../../config.json");
const embed = require("../../utility/embed");
const ms = require('ms');

module.exports = {
  name: "slowmode",
  description: "Add slowmode to current channel quickly!",
  userPermissions: 'MANAGE_CHANNELS',
  options: [{
    name: "time",
    description: "the amount of time in s, min, hr",
    type: 'STRING',
    required: true,
  }],
  run: async (client, interaction, args) => {

    const time = await interaction.options.getString('time');
    
    if (!time) return interaction.reply({
      embeds: embed.error(`Please provide a valid time!\ne.g \`${config.prefix}slowmode 2m 30s\``)
    });
    
    const formatTime = ms(time)/1000;
    if (formatTime === 0) return interaction.channel.setRateLimitPerUser(0).then(
      interaction.reply({
        embeds: embed.success(`Successfully set the slowmode to \`${time}\``)
      })
    );

    if (!formatTime || formatTime > 21600) return interaction.reply({
      embeds: embed.error("An error has occurred!")
    });

    await interaction.channel.setRateLimitPerUser(formatTime);
    interaction.reply({
      embeds: embed.success(`Successfully set the slowmode to \`${time}\``)
    });
  }
};
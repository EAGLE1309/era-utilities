const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");
const embed = require("../../utility/embed");

module.exports = {
  name: "uptime",
  description: "returns uptime of this bot",
  type: 'CHAT_INPUT',

  run: async (client, interaction, args) => {
    let totalSeconds = await (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    interaction.reply({
      embeds: embed.success(`${days} days\n${hours} hr(s)\n${minutes} min\n${seconds} sec`)
    });
  },
};
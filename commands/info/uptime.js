const {
  Message,
  Client,
  MessageEmbed,
} = require("discord.js");
const embed = require("../../utility/embed");

module.exports = {
  name: "uptime",
  aliases: ['up'],
  usage: " ",
  cooldown: '5s',
  run: async (client, message, args) => {

    let totalSeconds = await (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    message.channel.send({
      embeds: embed.success(`${days} days\n${hours} hr(s)\n${minutes} min\n${seconds} sec`)
    });

  },
};
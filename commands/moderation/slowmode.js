const {
  Message,
  Client,
  Permissions,
  MessageActionRow,
  MessageButton
} = require("discord.js");
config = require("../../config.json");
const embed = require("../../utility/embed");
const ms = require('ms');

module.exports = {
  name: "slowmode",
  aliases: ['sm'],
  usage: "<time>",
  description: "Adds slowmode in a specific channel!",
  userPermissions: "MANAGE_CHANNELS",
  run: async (client, message, args) => {

    const msgUser = await message.guild.members.fetch(message.member);
    const perms = await msgUser.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS]);
    const time = args.slice(0).join(" ");

    if (!perms) return message.channel.send({
      embeds: embed.error("You need\`MANAGE_CHANNELS\` permission to use this command!")
    });

    if (!time) return message.channel.send({
      embeds: embed.error(`Please provide a valid time!\ne.g \`${config.prefix}slowmode 2m 30s\``)
    });

    const formatTime = ms(time)/1000;

    if (formatTime === 0) return message.channel.setRateLimitPerUser(0).then(
      message.channel.send({
        embeds: embed.success(`Successfully set the slowmode to \`${time}\``)
      })
    );

    if (!formatTime || formatTime > 21600) return message.channel.send({
      embeds: embed.error("An error has occurred!")
    });

    await message.channel.setRateLimitPerUser(formatTime);
    message.channel.send({
      embeds: embed.success(`Successfully set the slowmode to \`${time}\``)
    });
  }
};
const {
  Message,
  Client,
  MessageEmbed,
  Permissions
} = require("discord.js");
const embed = require("../../utility/embed");
const ms = require('ms');

module.exports = {
  name: "mute",
  aliases: ['m'],
  usage: "@someone <time> <reason>",
  description: "Give server timeout to the mentioned member!",
  userPermissions: 'MODERATE_MEMBERS',
  run: async (client, message, args) => {

    const msgUser = message.member;
    const msgBot = message.guild.me;
    const target = message.mentions.members.first();
    const duration = args[1];
    const reason = args.slice(2).join(" ");
    const targetMember = await message.guild.members.fetch(target);
    const durationArray = [
      "60s",
      "1m",
      "5m",
      "10m",
      "1h",
      "1d",
      "7d"
    ];

    if (!target) return message.channel.send({
      embeds: embed.baseError("Please mention someone to mute!")
    });

    if (!duration) return message.channel.send({
      embeds: embed.baseError("Please provide some duration for mute!")
    });

    if (!durationArray.includes(duration)) return message.channel.send({
      embeds: embed.error(`Please provide a valid duration!\n\n**Available duration values:**\n${durationArray.join("\n")}`)
    });

    if (!reason) return message.channel.send({
      embeds: embed.baseError("Please provide a reason for mute!")
    });

    if (targetMember.roles.highest.position >= msgUser.roles.highest.position) {
      await message.channel.send({
        embeds: embed.baseError("You don't have enough hirerchy to mute that member")
      });
    }

    if (targetMember.roles.highest.position >= msgBot.roles.highest.position) {
      await message.channel.send({
        embeds: embed.baseError("I can't mute that member")
      });
    }

    const time = ms(duration);

    targetMember.timeout(time, reason).then(() => {
      message.channel.send({
        embeds: embed.success(`Successfully muted ${targetMember}\n**Duration:** ${duration}\n**Reason:** ${reason}`)
      });
    });

  }
};
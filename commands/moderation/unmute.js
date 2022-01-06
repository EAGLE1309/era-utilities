const {
  Message,
  Client,
  MessageEmbed,
  Permissions
} = require("discord.js");
const embed = require("../../utility/embed");

module.exports = {
  name: "unmute",
  aliases: ['unm'],
  usage: "@someone",
  description: "Removes server timeout from a mentioned member!",
  userPermissions: 'MODERATE_MEMBERS',
  run: async (client, message, args) => {

    const msgUser = message.member;
    const msgBot = message.guild.me;
    const target = message.mentions.members.first();
    const targetMember = await message.guild.members.fetch(target);

    if (!target) return message.channel.send({
      embeds: embed.baseError("Please mention someone to unmute!")
    });

    if (targetMember.roles.highest.position >= msgUser.roles.highest.position) {
      await message.channel.send({
        embeds: embed.baseError("You don't have enough hirerchy to unmute that member")
      });
    }

    if (targetMember.roles.highest.position >= msgBot.roles.highest.position) {
      await message.channel.send({
        embeds: embed.baseError("I can't unmute that member")
      });
    }

    targetMember.timeout(0).then(() => {
      message.channel.send({
        embeds: embed.success(`Successfully unmuted ${targetMember}`)
      });
    });

  }
};
const {
  Message,
  Client,
  MessageEmbed,
  Permissions
} = require("discord.js");
const ms = require('ms');

module.exports = {
  name: "nick",
  aliases: ['n'],
  usage: "@user <nickname>",
  description: "Set nickname of mentioned user!",
  userPermissions: "MANAGE_NICKNAMES",
  run: async (client, message, args) => {
    const msgUser = message.member;
    const msgBot = message.guild.me;
    const target = message.mentions.members.first();
    const NickUser = await message.guild.members.fetch(target);
    const nickName = args.slice(1).join(" ");

    /*==================== EMBEDS ====================*/

    const embed = new MessageEmbed()
    .setTitle("Notification - Nick Command")
    .setDescription(`Successfully changed Nickname of ${args[0]} to **${nickName}**`)
    .setColor('#00ff88')
    .setTimestamp();

    /*==================== EXECUTION ====================*/

    if (!target) return message.reply("Please mention a valid user!");
    if (!nickName) return message.reply("Please provide the new nickname");

    if (NickUser.roles.highest.position > msgUser.roles.highest.position) return message.reply({
      content: "You cant change nickname of that user!",
    });

    if (NickUser.roles.highest.position >= msgBot.roles.highest.position) return message.reply({
      content: "I cant change nickname of that user!",
    });

    NickUser.setNickname(nickName).catch(err => console.log(err));
    message.channel.send({
      embeds: [embed]
    });

  }
};
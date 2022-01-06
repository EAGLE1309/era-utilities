const {
  Client,
  Message,
  MessageEmbed,
} = require("discord.js");
config = require('../../config.json');
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: "userinfo",
  aliases: ['uinfo'],
  description: "get info about mentioned user!",
  usage: "@someone",
  cooldown: '5s',
  run: async (client, message, args) => {

    const msgUser = message.member;
    const msgMember = await message.guild.members.fetch(msgUser);
    const target = await message.mentions.members.first();
    let targetMember = await message.guild.members.fetch(target);

    const emojis = {
      online: '<:online:928167519796215838>',
      idle: '<:IDLE:928167598468767744>',
      dnd: '<:dnd:928167451114479617>',
      offline: '<:offline:928167678433173574>'
    };

    /*============== EXECUTION ==============*/

    if (!target) {
      targetMember = msgMember;
    }
    const _member = targetMember;
    const _createdAt = targetMember.user.createdTimestamp;
    const _roleColor = targetMember.roles.highest.color;
    const _roleHighest = targetMember.roles.highest;
    const _roleList = targetMember.roles.cache.map((r) => r).join(" ");
    const _username = targetMember.user.username + "#" + targetMember.user.discriminator;
    const nick = targetMember.nickname;
    const _status = targetMember.presence?.status || 'offline';
    const _joinedTimestamp = targetMember.joinedTimestamp;
    const _voiceDeafen = targetMember.voice.selfDeaf;
    const _voiceMute = targetMember.voice.selfMute;
    const _voiceServerDeafen = targetMember.voice.serverDeaf;
    const _voiceServerMute = targetMember.voice.serverMute;

    /*============== MESSAGE EMBEDS ==============*/

    const embed = new MessageEmbed()
    .setThumbnail(`${targetMember.user.avatarURL()}`)
    .setColor(config.cPrimary)
    .setDescription(`**Userinfo for **${_member}`)
    .addFields(
      {
        name: "Basic Info:",
        value: `**Username:** ${_username}\n**Nickname:** ${nick}\n _ _`
      },
      {
        name: 'Status:',
        value: emojis[_status] + ` **${_status}**\n_ _`
      },
      {
        name: 'Highest Role:',
        value: `${_roleHighest}\n_ _`
      },
      {
        name: 'All Roles:',
        value: `${_roleList}\n_ _`
      },
      {
        name: 'Joined TimeStamp:',
        value: `Joined at: <t:${Math.floor(_joinedTimestamp/1000)}:R>\n_ _`
      },
      {
        name: 'Account Creation:',
        value: `Account created at: <t:${Math.floor(_createdAt/1000)}:R>\n_ _`
      })
    .setFooter({
      text: `Executed by ${message.author.username}`
    })
    .setTimestamp();

    /*============== MESSAGE SENDER ==============*/

    await message.channel.send({
      embeds: [embed],
    });

  }
};
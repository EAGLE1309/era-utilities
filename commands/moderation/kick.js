const {
  Message,
  Client,
  Permissions,
  MessageActionRow,
  MessageButton
} = require("discord.js");
const embed = require("../../utility/embed");

module.exports = {
  name: "kick",
  aliases: ['ki'],
  usage: "@user <reason>",
  description: "Use this command to kick the mentioned user!",
  userPermissions: "KICK_MEMBERS",
  run: async (client, message, args) => {

    /*==================== VARIABLES ====================*/

    const msgUser = await message.guild.members.fetch(message.member);
    const msgBot = message.guild.me;
    const target = message.mentions.members.first();
    const kickTarget = await message.guild.members.fetch(target);
    const reason = args.slice(1).join(" ") || "no reason specified";
   
    /*==================== POSSIBLE ERRORS ====================*/

    if (!target) return message.channel.send({
      embeds: embed.error("Please mention a valid user to kick him!")
    });
    if (kickTarget.roles.highest.position >= msgUser.roles.highest.position) return message.channel.send({
      embeds: embed.error("You can't kick that user!")
    });
    if (kickTarget.roles.highest.position >= msgBot.roles.highest.position) return message.channel.send({
      embeds: embed.error("I can't kick that user!")
    });

    /*==================== EXECUTION ====================*/

    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setLabel(`Reason: ${reason}`)
      .setStyle('SECONDARY')
      .setCustomId('id')
      .setDisabled(true)
    );

    await kickTarget.send({
      embeds: embed.baseError(`You have been kicked from ${message.guild.name} for \`${reason}\``),
      components: [row]
    }).catch(err => console.log(err));
    message.guild.members.kick(kickTarget, reason).then(async a => {
      message.channel.send({
        embeds: embed.success(`Successfully kicked \`${a.user.username}#${a.user.discriminator}\``),
        components: [row]
      });
    });
    // guild.members.kick();
  }
};
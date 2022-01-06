const client = require("../index");
const Discord = require('discord.js');
const ms = require('ms');
const prefix = client.config.prefix;
const embed = require("../utility/embed");
const {
  Permissions
} = require("discord.js");

client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(client.config.prefix)
  )
    return;

  const [cmd,
    ...args] = message.content
  .slice(prefix.length)
  .trim()
  .split(" ");

  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return message.channel.send({
    content: "command not found"
  }).then((msg) => {
    setTimeout(() => msg.delete(), ms('3 seconds'));
  });

  /*==================== VARIABLES ====================*/

  const msgUser = await message.guild.members.fetch(message.member);
  const permName = command?.userPermissions;

  if (permName) {
    const perms = await msgUser.permissions.has(permName || []);
    if (!perms) return message.channel.send({
      embeds: embed.error(`You need \`${permName}\` permission to use this command!`)
    });
  }

  await command.run(client, message, args);

});
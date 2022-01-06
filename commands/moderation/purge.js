const {
  Message,
  Client,
  Permissions
} = require("discord.js");
const ms = require('ms');

module.exports = {
  name: "purge",
  aliases: ['clear',
    'c',
    'p'],
  usage: "<number>",
  description: "Purges/clears a certain number of messages!",
  userPermissions: "MANAGE_MESSAGES",
  run: async (client, message, args) => {

    const perms = await message.member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES]);
    const NumArgs = args[0];

    /*==================== EXECUTION ====================*/

    if (perms === false) return message.reply("You need Manage Messages permissions to use this command");

    if (!args[0]) return message.reply("Please enter the amount of messages to clear!");

    if (isNaN(args[0])) return message.reply("Please type a real number!");

    if (args[0] > 100) return message.reply("You can't remove more than 100 messages!");

    if (args[0] < 1) return message.reply("You have to delete at least one message!");
    const parsedArg = parseInt(args[0]) + 1;

    await message.channel.messages.fetch({
      limit: parsedArg
    }).then(messages => {
      message.channel.bulkDelete(messages);
    });
    message.channel.send({
      content: `Sucessfully deleted ${NumArgs} messages!`
    }).then((msg) => {
      setTimeout(() => msg.delete(), ms('3 seconds'));
    });
  },
};
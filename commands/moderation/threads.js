const {
  Message,
  Client,
  MessageEmbed,
  Permissions
} = require("discord.js");
const embed = require("../../utility/embed");

module.exports = {
  name: "thread",
  aliases: ['th'],
  usage: "add / remove <name>",
  description: "Quickly create or delete threads!",
  userPermissions: "MANAGE_THREADS",
  run: async (client, message, args) => {

    const firstArg = args[0];
    const secondArg = args.slice(1).join("-");
    const thread = message.channel.threads.cache.find(x => x.name === secondArg);
    const date = Math.round(new Date().getTime()/1000);

    /*================= CONDITIONS & EXECUTION =================*/
    if (!firstArg || !secondArg) {
      message.channel.send({
        embeds: embed.error("Invalid or missing arguments")
      });
    }

    if (firstArg === "add") {
      await message.channel.threads.create({
        name: `${secondArg}`,
        autoArchiveDuration: 60,
        reason: 'Needed a separate thread',
      });
      await message.channel.send({
        embeds: embed.success(`Successfully created a thread!\n> **Name:** ${secondArg}\n> **Created at**: <t:${date}:R>`)
      });
    }

    if (firstArg === "remove") {
      const thread = message.channel.threads.cache.find(x => x.name === `${secondArg}`);
      if (!thread)
        return message.channel.send({
        embeds: embed.error(`Thread not found make sure to enter **correct** and valid name!`)
      });

      await thread.delete();
      await message.channel.send({
        embeds: embed.success(`Successfully deleted the thread!\n> **Name:** ${secondArg}\n> **Created at**: <t:${date}:R>`)
      });
    }

  }
};
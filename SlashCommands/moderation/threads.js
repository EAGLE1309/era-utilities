const {
  MessageEmbed
} = require('discord.js');
const embed = require("../../utility/embed");

module.exports = {
  name: 'threads',
  description: 'Quickly create or delete threads',
  userPermissions: 'MANAGE_CHANNELS',
  options: [{
    name: 'actions',
    description: "what would you like to do?",
    type: 'STRING',
    required: true,
    choices: [{
      name: "Add",
      value: "add-thread"
    },
      {
        name: "Remove",
        value: "remove-thread"
      }]
  },
    {
      name: "name",
      description: "provide name of the thread",
      required: true,
      type: 'STRING'
    }],

  run: async (client, interaction, args) => {
    const type = interaction.options.getString('actions');
    const name = interaction.options.getString('name');
    const date = Math.round(new Date().getTime()/1000);
    console.log(name);

    /*================= CONDITIONS & EXECUTION =================*/

    if (type === "add-thread") {
      await interaction.channel.threads.create({
        name: `${name}`,
        autoArchiveDuration: 60,
        reason: 'Needed a separate thread',
      });
      await interaction.reply({
        embeds: embed.success(`Successfully created a thread!\n> **Name:** ${name}\n> **Created at**: <t:${date}:R>`)
      });
    }

    if (type === "remove-thread") {
      const thread = interaction.channel.threads.cache.find(x => x.name === `${name}`);
      if (!thread)
        return interaction.reply({
        embeds: embed.error(`Thread not found make sure to enter **correct** and valid name!`)
      });

      await thread.delete();
      await interaction.reply({
        embeds: embed.success(`Successfully deleted the thread!\n> **Name:** ${name}\n> **Created at**: <t:${date}:R>`)
      });
    }


  }
};
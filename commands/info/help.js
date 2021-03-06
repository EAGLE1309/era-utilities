const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const client = require("../../index");
const {
  readdirSync
} = require("fs");
config = require('../../config.json');
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: "help",
  aliases: ['h'],
  description: "This command list all commands in this bot!",
  usage: " ",
  run: async (client, message, args, interaction) => {

    const directories = [
      ...new Set(client.commands.map((cmd) => cmd.directory)),
    ];

    const emojis = {
      info: '<:info:890586176187146260>',
      fun: '<:star:890586677779779625>',
      anime: '<:anime:908359934595457054>',
      moderation: '<:shield:908587864806293504>'
    };

    const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
    const categories = directories.map((dir) => {
      const getCommands = client.commands
      .filter((cmd) => cmd.directory === dir)
      .map((cmd) => {
        return {
          name: cmd.name || "no name provided for this command",
          description: cmd.description || "no description provided for this command!",
          usage: cmd.usage || "no usage provided for this command"
        };
      });
      return {
        directory: dir,
        commands: getCommands,
      };
    });

    /*======= MESSAGE EMBED & MESSAGE SELECT MENU =======*/

    const embed = new MessageEmbed()
    .setTitle("Era Utilities - Help Page")
    .setThumbnail(`${client.user.avatarURL()}`)
    .setDescription("**Please choose a category in the dropdown menu!**\n \u200B")
    .addFields(
      {
        name: "Prefix",
        value: `Current prefix is: \`${config.prefix}\``
      },
      {
        name: "About Era Utilities",
        value: "> Era Utilities is based on Project Lunar. Lunar is a open source discord bot created in JavaScript. This bot provides you utilities, moderation and many other awesome features. If you want to contribute to this project then you are happily welcome!\n \u200B"
      },
      {
        name: "\n Useful Links",
        value: `[GitHub](https://github.com/eagle1309/era-utilities) \n[Discord](https://discord.gg/vfd6xT2uPB)  \n \u200B`
      }
    )
    .setColor(config.cPrimary)
    .setFooter(`Executed by ${message.author.username}`, `${message.author.avatarURL()}`)
    .setTimestamp();

    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder("Select a category")
        .setDisabled(state)
        .addOptions(
          categories.map((cwd) => {
            return {
              label: cwd.directory,
              value: cwd.directory.toLowerCase(),
              description: `Commands from ${cwd.directory} category`,
              emoji: emojis[cwd.directory.toLowerCase()] || null,
            };
          })
        )
      ),
    ];
    const initialMessage = await message.channel.send({
      embeds: [embed],
      components: components(false),
    });
    const author = message.author.id;
    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
      time: 300000,
    });

    /*======= POSSIBLE ERRORS =======*/

    /* working on it */

    /*======= COLLECTORS =======*/

    collector.on("collect", async(interaction) => {
      if (author != interaction.user) {
        await interaction.reply({
          content: "You cant use this interaction",
          ephemeral: true
        });
      }

      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );
      
      const commandMap = category.commands.map((cmd) => {
        return `**${config.prefix}${cmd.name}**\n> **Description: **${cmd.description}\n> **Usage: **\`${config.prefix}${cmd.name} ${cmd.usage}\`\n`;
      });
      
      const categoryEmbed = new MessageEmbed()
      .setTitle(`Here are the list of ${directory} commands`)
      .setThumbnail(`${client.user.avatarURL()}`)
      .setColor(config.cPrimary)
      .setTimestamp()
      .setDescription(commandMap.join("\n"))
      .setFooter(`Executed by ${message.author.username}`, `${message.author.avatarURL()}`);
      
      interaction.update({
        content: "Select menu will expire in 5 min",
        embeds: [categoryEmbed]
      });

      await wait(300000);
      interaction.editReply({
        content: "This message had been expired!",
        components: components(true)
      });
    });

    collector.on("end",
      () => {
        initialMessage.edit({
          components: components(true)
        });
      });

  },
};
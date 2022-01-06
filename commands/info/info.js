const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  CommandInteraction,
  MessageButton
} = require("discord.js");
config = require('../../config.json');
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: "info",
  aliases: ['i'],
  description: "get info about bot and its developer!",
  usage: " ",
  cooldown: '5s',
  run: async (client, message, interaction, args) => {

    /*============== MESSAGE BUTTONS ==============*/

    const row = new MessageActionRow()
    .addComponents(
      [
        new MessageButton()
        .setLabel('Contribute')
        .setStyle('LINK')
        .setURL("https://eaglenetwork.tk")
      ],
      [
        new MessageButton()
        .setCustomId('more')
        .setLabel('More Info')
        .setStyle('SECONDARY')
      ]);

    const row2 = new MessageActionRow()
    .addComponents(
      [
        new MessageButton()
        .setLabel('Eagle Networks')
        .setStyle('LINK')
        .setURL("https://eaglenetwork.tk")
      ],
      [
        new MessageButton()
        .setCustomId('back')
        .setLabel('Back')
        .setStyle('SECONDARY')
      ]
    );
    const expiredRow = new MessageActionRow()
    .addComponents(
      [
        new MessageButton()
        .setLabel('Report Bug')
        .setStyle('LINK')
        .setURL("https://eaglenetwork.tk/#contact")
      ],
      [
        new MessageButton()
        .setCustomId('more')
        .setLabel('Expired')
        .setStyle('DANGER')
        .setDisabled(true)
      ]
    );

    /*============== MESSAGE EMBED ==============*/

    const embed = new MessageEmbed()
    .setColor(config.cPrimary)
    .setTitle('Era Utilities - Info Page')
    .setThumbnail(`${client.user.avatarURL()}`)
    .setURL('https://eaglenetwork.tk')
    .setDescription('Click the buttons below to get more info about me!')
    .setFooter(`Executed by ${message.author.username}`, `${message.author.avatarURL()}`)
    .setTimestamp();

    const infoEmbed = new MessageEmbed()
    .setColor(config.cPrimary)
    .setTitle('Info Page')
    .setThumbnail(`${client.user.avatarURL()}`)
    .setURL('https://eaglenetwork.tk')
    .addFields(
      {
        name: "Eagle Networks",
        value: "> [Website](https://eaglenetwork.tk)\n> [About](https://eaglenetwork.tk)\n> [GitHub](https://eaglenetwork.tk)"
      },
      {
        name: "Era Utilities",
        value: "> [Website](https://eaglenetwork.tk)\n> [About](https://eaglenetwork.tk)\n> [GitHub](https://eaglenetwork.tk)\n> [Status](https://projectlunar.statuspage.io/)\n"
      })
    .setTimestamp();

    /*============== MESSAGE SENDER ==============*/

    await message.channel.send({
      embeds: [embed],
      components: [row]
    });

    /*============== COLLECTORS ==============*/
    const author = message.author;
    const filter = (interaction) => interaction.user.id === message.author.id;
    const btnId = interaction.customId;

    const collector = message.channel.createMessageComponentCollector({
      filter,
      componentType: 'BUTTON',
      time: 300000
    });

    collector.on('collect', async(interaction) => {

      if (author != interaction.user) {
        await interaction.reply({
          content: "You cant use this interaction",
          ephemeral: true
        });
      }

      if (interaction.customId === 'more') {
        await interaction.update({
          content: "This message will expire in 5 min!",
          embeds: [infoEmbed],
          components: [row2]
        });
      }

      if (interaction.customId === 'back') {
        await interaction.update({
          content: "This message will expire in 5 min!",
          components: [row],
          embeds: [embed]
        });
      }

      await wait(300000);
      interaction.editReply({
        content: "This message had been expired!",
        components: [expiredRow]
      });
    });

    collector.on('end',
      () => {
        console.log("collected!");
      });
  },
};
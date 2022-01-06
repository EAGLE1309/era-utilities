const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require("discord.js");

module.exports = {
  name: "info",
  description: "get info about bot and its developer!",
  type: 'CHAT_INPUT',

  run: async (client, interaction, args) => {

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

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });

    /*============== COLLECTORS ==============*/
    const author = interaction.user;
    const filter = (interaction) => interaction.user.id === interaction.user.id;
    const btnId = interaction.customId;

    const collector = interaction.channel.createMessageComponentCollector({
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
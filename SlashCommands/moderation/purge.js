const {
  Client,
  MessageEmbed
} = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "purge",
  description: "deletes a specific number of messages",
  options: [{
    name: 'number',
    description: "number of messages to purge",
    type: 'INTEGER',
    required: true,
  }],
  userPermissions: "MANAGE_MESSAGES",
  run: async (client, interaction, args) => {
    const amount = interaction.options.getInteger("number");
    const intUser = await interaction.guild.members.fetch(interaction.member);

    /*==================== EMBEDS ====================*/

    //100 messages error
    const error100 = new MessageEmbed()
    .setTitle('An error has occured!')
    .setDescription(`You cant delete more than 100 messages at a time!`)
    .setColor('#DA1B00')
    .setTimestamp();

    // 14 days error
    const error14 = new MessageEmbed()
    .setTitle('An error has occured!')
    .setDescription(`I cannot delete messages older than 14 days!`)
    .setColor('#DA1B00')
    .setTimestamp();

    if (amount > 100)
      return interaction.reply({
      embeds: [error100],
      ephemeral: true
    });

    const messages = await interaction.channel.messages.fetch({
      limit: amount
    });
    const msgTime = messages.find(
      (msgs) => Date.now() - msgs.createdTimestamp < ms("14 days"));
    const filtered = messages.filter(
      (msg) => Date.now() - msg.createdTimestamp < ms("14 days")
    );

    if (msgTime === undefined)
      return interaction.reply({
      content: "I cannot delete messages older than 14 days!",
      ephemeral: true
    });

    //Success Embed
    const successEmbed = new MessageEmbed()
    .setTitle('Success!')
    .setDescription(`Successfully Deleted ${filtered.size} messages`)
    .setColor('#00ff88')
    .setTimestamp();

    /*==================== EXECUTION ====================*/

    await interaction.channel.bulkDelete(filtered);
    await interaction.reply({
      embeds: [successEmbed]
    }).then((msg) => {
      setTimeout(() => interaction.deleteReply(), ms("5 seconds"));
    });
  },
};
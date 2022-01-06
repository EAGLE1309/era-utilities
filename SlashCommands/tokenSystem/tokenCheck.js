const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");
const tokenModel = require("../../models/tokenModel");

module.exports = {
  name: "token_check",
  description: "add or remove token from a member",
  userPermissions: 'SEND_MESSAGES',
  options: [{
    name: 'user',
    description: 'whose tokens you want to view?',
    type: 'USER',
    required: true
  }],

  run: async (client, interaction, args) => {
    const target = interaction.options.getUser('user');
    const targetMember = await interaction.guild.members.fetch(target);

    const filter = {
      userId: targetMember.id
    };
    const modelFinder = await tokenModel.findOne(filter);
    
    if (!modelFinder) return interaction.reply({
      content: `${targetMember} haven't earned any token yet!`
    });
    
    const _tokens = modelFinder.tokens;
    
    const embed = new MessageEmbed()
    .setColor('#fece04')
    .setTitle('Totem Inventory - Era Utilities')
    .setDescription(`\n${targetMember}'s totem inventory\n> <a:totem:912353502272053348> **Totems:** ${_tokens}\n`)
    .setTimestamp();
    
    await interaction.reply({
      embeds: [embed]
    });
  }
};
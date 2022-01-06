const {
  Permissions
} = require('discord.js');

module.exports = {
  name: "nick",
  description: "Sets Nickname of a specified user!",
  userPermissions: 'MANAGE_NICKNAMES',
  options: [{
    name: 'target',
    description: "Select a user to nick",
    type: "USER",
    required: true
  },
    {
      name: 'nickname',
      description: "Set the new Nickname",
      type: "STRING",
      required: true,
    }],

  run: async (client, interaction, args) => {

    const target = interaction.options.getUser('target');
    const nick = interaction.options.getString('nickname');
    const NickUser = await interaction.guild.members.fetch(target);
    const intUser = await interaction.guild.members.fetch(interaction.member);
    const intBot = await interaction.guild.me;

    /*==================== EXECUTION ====================*/

    if (NickUser.roles.highest.position >= intUser.roles.highest.position) {
      await interaction.reply({
        content: "You cant change nickname of that user!", ephemeral: true
      });
    }
    if (NickUser.roles.highest.position >= intBot.roles.highest.position) {
      await interaction.reply({
        content: "I cant change nickname of that user!", ephemeral: true
      });
    }

    NickUser.setNickname(nick).catch(err => console.log(err));
    await interaction.reply(`Hey ${target} your nickname was changed to ${nick}`);
  }
};
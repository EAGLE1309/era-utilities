const {
  Client,
  Permissions,
  CommandInteraction,
  MessageActionRow,
  MessageButton
} = require("discord.js");
config = require("../../config.json");
const embed = require("../../utility/embed");

module.exports = {
  name: "unmute",
  description: "Removes server timeout from a mentioned member!",
  userPermissions: 'MODERATE_MEMBERS',
  options: [{
    name: "target",
    description: "Select a user to remove timeout",
    type: 'USER',
    required: true,
  }],

  run: async (client, interaction, args) => {
    const target = interaction.options.getUser('target');
    const targetMember = await interaction.guild.members.fetch(target);
    const intUser = await interaction.guild.members.fetch(interaction.member);
    const intBot = await interaction.guild.me;

    /*==================== EXECUTION ====================*/

    if (targetMember.roles.highest.position >= intUser.roles.highest.position) {
      await interaction.reply({
        embeds: embed.baseError("You don't have enough hirerchy to unmute that member")
      });
    }
    if (targetMember.roles.highest.position >= intBot.roles.highest.position) {
      await interaction.reply({
        embeds: embed.baseError("I can't unmute that member")
      });
    }

    targetMember.timeout(0).then(() => {
      interaction.reply({
        embeds: embed.success(`Successfully unmuted ${targetMember}`)
      });
    });
  }
};
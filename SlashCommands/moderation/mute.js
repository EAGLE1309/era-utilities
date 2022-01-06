const {
  Client,
  Permissions,
  CommandInteraction,
  MessageActionRow,
  MessageButton
} = require("discord.js");
config = require("../../config.json");
const embed = require("../../utility/embed");
const ms = require('ms');

module.exports = {
  name: "mute",
  description: "Give server timeout to the mentioned member",
  userPermissions: 'MODERATE_MEMBERS',
  options: [{
    name: "target",
    description: "Select a user to give timeout",
    type: 'USER',
    required: true,
  },
    {
      name: "duration",
      description: "Duration of timeout",
      type: 'STRING',
      required: true,
      choices: [{
        name: "60 seconds",
        value: "60s"
      },
        {
          name: "5 minutes",
          value: "5m"
        },
        {
          name: "10 minutes",
          value: "10m"
        },
        {
          name: "1 hour",
          value: "1h"
        },
        {
          name: "1 day",
          value: "1d"
        },
        {
          name: "1 week",
          value: "7d"
        }]
    },
    {
      name: "reason",
      description: "Reason for timeout",
      type: 'STRING',
      required: true
    }],
  run: async (client, interaction, args) => {
    const duration = interaction.options.getString('duration');
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason');
    const targetMember = await interaction.guild.members.fetch(target);
    const intUser = await interaction.guild.members.fetch(interaction.member);
    const intBot = await interaction.guild.me;

    /*==================== EXECUTION ====================*/

    if (targetMember.roles.highest.position >= intUser.roles.highest.position) {
      await interaction.reply({
        embeds: embed.baseError("You don't have enough hirerchy to mute that member")
      });
    }
    if (targetMember.roles.highest.position >= intBot.roles.highest.position) {
      await interaction.reply({
        embeds: embed.baseError("I can't mute that member")
      });
    }
    
    const time = ms(duration);
    
    targetMember.timeout(time, reason).then(() => {
      interaction.reply({
        embeds: embed.success(`Successfully muted ${targetMember}\n**Duration:** ${duration}\n**Reason:** ${reason}`)
      });
    });
  }
};
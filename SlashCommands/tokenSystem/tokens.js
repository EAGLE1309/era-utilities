const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");
const tokenModel = require("../../models/tokenModel");

module.exports = {
  name: "token",
  description: "add or remove token from a member",
  userPermissions: 'ADMINISTARTOR',
  options: [{
    name: "action",
    description: "what would you like to do?",
    type: 'STRING',
    required: true,
    choices: [{
      name: 'Add',
      value: 'add-token'
    },
      {
        name: 'Remove',
        value: 'remove-token'
      }]
  },
    {
      name: 'target',
      description: 'your target',
      type: 'USER',
      required: true
    },
    {
      name: 'amount',
      description: 'how much token you want to add/remove?',
      required: true,
      type: 'INTEGER'
    }],

  run: async (client, interaction, args) => {
    const intMember = await interaction.guild.members.fetch(interaction.member);
    const target = interaction.options.getUser('target');
    const targetMember = await interaction.guild.members.fetch(target);
    const type = interaction.options.getString('action');
    const amount = interaction.options.getInteger('amount');

    if (intMember.id != '556789028872257537') return interaction.reply({
      content: "You are not allowed to do that bish!"
    });

    if (type == 'add-token') {

      //mongoose stuff

      const filter = {
        userId: targetMember.id
      };
      const modelFinder = await tokenModel.findOne(filter);
      const update = {
        tokens: 1 + amount
      };

      if (modelFinder) {
        const tokenModelUpdated = await tokenModel.findOneAndUpdate(filter, update, {
          new: true
        }).then(() =>
          interaction.reply({
            content: `Successfully added <a:totem:912353502272053348> \`${amount}\` totems to ${targetMember}!`
          }));
      } else {
        const models = await new tokenModel({
          userId: targetMember.id,
          tokens: amount
        });

        await models.save().then(()=>
          interaction.reply({
            content: `Successfully added <a:totem:912353502272053348> \`${amount}\` totems to ${targetMember}!`
          })
        );
      }
    }

    if (type == 'remove-token') {
      const filter = {
        userId: targetMember.id
      };
      const modelFinder = await tokenModel.findOne(filter);
      const update = {
        tokens: modelFinder.tokens - amount
      };

      if (modelFinder) {
        const tokenModelUpdated = await tokenModel.findOneAndUpdate(filter, update, {
          new: true
        }).then(() =>
          interaction.reply({
            content: `Successfully removed \`${amount}\` tokens to ${targetMember}!`
          })
        );
      }
    }
  }
};
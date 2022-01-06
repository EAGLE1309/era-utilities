const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  baseError: (a) => [
    new MessageEmbed()
    .setColor(config.cRed)
    .setDescription(a)
    .setTimestamp()
  ],
  success: (a) => [
    new MessageEmbed()
    .setColor(config.cGreen)
    .setTitle('Success')
    .setDescription(a)
    .setTimestamp()
  ],

  error: (a) => [
    new MessageEmbed()
    .setColor(config.cRed)
    .setTitle('Error')
    .setDescription(a)
    .setTimestamp()
  ]
};
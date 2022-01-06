const {
  MessageEmbed
} = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
  name: "slap",
  description: "slap someone!",
  aliases: ['s'],
  usage: "@someone",
  cooldown: '5s',
  run: async (client, message, args) => {

    if (!message.mentions.users.first()) {

      return await fetch("https://nekos.life/api/v2/img/slap")
      .then(res => res.json())
      .then(body => {
        const embed = new MessageEmbed()
        .setColor("#fece04")
        .setDescription(`**${message.author} slapped someone!**`)
        .setImage(body.url)
        .setTimestamp()

        message.channel.send({
          embeds: [embed],
        });
      });
    };

    const victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;

    if (victim != message.author) {
      await fetch("https://nekos.life/api/v2/img/slap")
      .then(res => res.json())
      .then(body => {
        const embed = new MessageEmbed()
        .setColor("#fece04")
        .setDescription(`**${victim} was slapped by ${message.author}**`)
        .setImage(body.url)
        .setTimestamp()

        message.channel.send({
          embeds: [embed],
        });
      })} else {
      await fetch("https://nekos.life/api/v2/img/slap")
      .then(res => res.json())
      .then(body => {
        const embed = new MessageEmbed()
        .setColor("#fece04")
        .setDescription(`**${victim} slapped someone!**`)
        .setImage(body.url)
        .setTimestamp()

        message.channel.send({
          embeds: [embed],
        });
      })
    };
  },
};
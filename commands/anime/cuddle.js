const {
  MessageEmbed
} = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
  name: "cuddle",
  description: "cuddle someone!",
  aliases: ['snuggle'],
  usage: "@someone",
  cooldown: '5s',
  run: async (client, message, args) => {

    let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    if (victim != message.author) {
      await fetch("https://nekos.life/api/v2/img/cuddle")
      .then(res => res.json())
      .then(body => {
        const embed = new MessageEmbed()
        .setColor("#fece04")
        .setDescription(`${victim} was snuggled by ${message.author}`)
        .setImage(body.url)
        .setTimestamp();

        message.channel.send({
          embeds: [embed],
        });
      });
    } else {
      await fetch("https://nekos.life/api/v2/img/cuddle")
      .then(res => res.json())
      .then(body => {
        const embed = new MessageEmbed()
        .setColor("#fece04")
        .setDescription(`**${victim} snuggled someone!**`)
        .setImage(body.url)
        .setTimestamp();

        message.channel.send({
          embeds: [embed],
        });
      });
    }
  },
};
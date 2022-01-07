const client = require("../index");
const Discord = require('discord.js');
const wait = require('util').promisify(setTimeout);
const joinChannel = require('../config.json');

client.on("guildMemberAdd", async (member) => {
  if (member.user.bot) return;
  if (member.pending) return;

  const array = [
    "Welcome to the server",
    "Glad to see you here",
    "Welcome home",
    "Ahh! welcome",
    "Spawned a new",
    "Hey yo! welcome", //add more messages here!
  ];
  const gateway = member.guild.channels.cache.get(joinChannel);
  gateway.send({
    content: `${client.tools.arrayRandom(array)} ${member.user}!`
  });
});
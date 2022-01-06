const client = require("../index");
const Discord = require('discord.js');
const wait = require('util').promisify(setTimeout);

client.on("guildMemberAdd", async (member) => {
  if (member.user.bot) return;
  if (member.pending) return;

  const array = [
    "Welcome to the server",
    "Glad to see you here",
    "Welcome home",
    "Ahh! welcome",
    "Spawned a new",
    "Hey yo! welcome",
  ];
  const gateway = member.guild.channels.cache.get("856467576066015242");
  gateway.send({
    content: `${client.tools.arrayRandom(array)} ${member.user}!`
  });
});
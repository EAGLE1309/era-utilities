const {
  Message,
  Client
} = require("discord.js");

module.exports = {
  name: "nitro",
  description: "Gives you free nitro! lol",
  usage: " ",
  run: async (client, message, args) => {

    message.reply({
      content: `Press **F** to get free nitro! _lol_`,
      allowedMentions: {
        repliedUser: false
      }
    });
  },
};
const {
  Client,
  Collection
} = require("discord.js");
const chalk = require('chalk');
const client = new Client({
  intents: 32767,
});
module.exports = client;
console.clear();
console.log(chalk.cyan('Booting Client...'));

/*================ GLOBAL VARIABLES ================*/

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.tools = require("./utility/tools.js");

/*======= INITIALISING THE PROJECT =======*/

require("./handler")(client);
client.login(client.config.token);
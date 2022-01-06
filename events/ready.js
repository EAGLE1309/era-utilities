const client = require("../index");
const {
  activityName,
  activityType
} = require("../config.json");
const chalk = require('chalk');
const success = chalk.greenBright;
const wait = require('util').promisify(setTimeout);

client.on('debug', m => console.log(m));
client.on('warn', m => console.log(m));
client.on('error', m => console.log(m));

process.on("rejectionHandled", (err) => console.error(err));
process.on("unhandledRejection", (err) => console.error(err));
process.on("uncaughtException", (err) => console.error(err));

client.on("ready", async() => {
  client.user.setPresence({
    status: "online",
    activities: [{
      name: activityName,
      type: activityType,
    }]
  });
  console.log(success(`\n========== LOGGED IN ==========\n${client.user.tag} is online!\n========== SUCCESS ==========\n`));
});
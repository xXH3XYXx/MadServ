require("dotenv").config();
const fs = require("fs");
//---------------Express settings
const express = require("express");
const app = express();
app.enable("trust proxy");
app.set("etag", false);
app.use(express.static(__dirname + "/dashbored"));
app.set("views", __dirname);
app.set("view engine", "ejs");
//---------------Express settings end
const Database = require("./src/config/Database.js");
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});
const db = new Database();
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
module.exports.client = client;
db.connect();
client.commands = new Collection();

for (let file of commandFiles) {
  let command = require(`./src/commands/${file}`);
  if (Array.isArray(command.data)) {
    command.data.forEach(currentCommand => {
      client.commands.set(currentCommand.name, currentCommand);
    });
  }
  else {
    client.commands.set(command.data.name, command.data);
  }
}

let files = fs.readdirSync("./src/dashbored/public").filter(f => f.endsWith(".js"));
files.forEach(f => {
    const file = require(`./src/dashbored/public/${f}`);
    if (file && file.name) {
        app.get(file.name, file.run);
        console.log(`[Dashbored] - loaded ${file.name}`);
    }
})

for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}





client.login(process.env.TOKEN);

app.listen(process.env.PORT, () => console.log(`Loaded Dashboard listening on port:${process.env.PORT}`));

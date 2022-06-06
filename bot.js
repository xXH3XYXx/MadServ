require("dotenv").config();
const fs = require("fs");
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

for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.TOKEN);

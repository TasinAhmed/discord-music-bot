import { Client, Collection, Intents } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import { BotClient } from "./types/BotClient";
import { BotCommand } from "./types/BotCommand";

dotenv.config();

export const client: BotClient = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command: BotCommand = require(`./commands/${file}`).default;
  client.commands.set(command.data.name, command);
}

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".ts"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`).default;

  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args));
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args));
  }
}

client.login(process.env.TOKEN);

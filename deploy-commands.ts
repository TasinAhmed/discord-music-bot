import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "fs";
import { BotCommand } from "./types/BotCommand";
import dotenv from "dotenv";

dotenv.config();

const commands: Array<any> = [];

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command: BotCommand = require(`./commands/${file}`).default;
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN!);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands,
    });

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.log(error);
  }
})();

console.log(process.env.TOKEN);

import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export type BotCommand = {
  data: any;
  execute: (...args: any[]) => Promise<void>;
};

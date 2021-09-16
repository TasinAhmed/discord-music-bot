import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { BotCommand } from "../types/BotCommand";

const skip: BotCommand = {
  data: new SlashCommandBuilder().setName("skip").setDescription("Skip music"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("skip");
  },
};

export default skip;

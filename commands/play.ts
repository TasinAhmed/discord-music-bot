import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { BotCommand } from "../types/BotCommand";

const play: BotCommand = {
  data: new SlashCommandBuilder().setName("play").setDescription("Play music"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("play");
  },
};

export default play;

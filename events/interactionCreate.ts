import { Interaction } from "discord.js";
import { BotEvent } from "../types/BotEvent";

const interactionCreate: BotEvent = {
  name: "interactionCreate",
  async execute(client, interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};

export default interactionCreate;

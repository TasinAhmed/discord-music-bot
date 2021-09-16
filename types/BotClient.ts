import { Client, Collection } from "discord.js";
import { CommandNames } from "./CommandNames";
import { BotCommand } from "./BotCommand";

export interface BotClient extends Client {
  commands?: Collection<string, BotCommand>;
}

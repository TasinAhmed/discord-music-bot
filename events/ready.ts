import { BotEvent } from "../types/BotEvent";

const ready: BotEvent = {
  name: "ready",
  once: true,
  execute() {
    console.log("Ready!");
  },
};

export default ready;

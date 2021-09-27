import { Client, Collection, Intents } from "discord.js";
import dotenv from "dotenv";
import { BotClient } from "./types/BotClient";
import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  VoiceConnection,
} from "@discordjs/voice";
import ytdl from "ytdl-core";

dotenv.config();

export const client: BotClient = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.mentions.everyone || !message.mentions.has(client.user!)) return;

  const guild = client.guilds.cache.get(message.guildId!);
  const member = guild?.members.cache.get(message.member?.id!);
  const voiceChannel = member?.voice.channel;

  if (voiceChannel) {
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    const resource = createAudioResource(
      ytdl(process.env.SONG_LINK!, {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      })
    );
    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);
    console.log("Playing");

    player.on("error", (error) => {
      console.error(error);
    });

    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });
  } else {
    await message.reply("Must be in a voice channel");
  }
});

client.login(process.env.TOKEN);

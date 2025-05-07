import { Client, GatewayIntentBits, Events } from "discord.js";
import { getResponse } from "./api";
import config from "../config.json";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.mentions.has(client.user)) {
    console.log(`Mentioned by ${message.author.tag}`);
    const trimmedMessage = message.content.replace(/<@&?(\d+)>/, "").trim();
    const requestMessage = `あなたは名探偵コナンの服部平治です。関西弁で話してください。 ${trimmedMessage}`;
    const response = await getResponse(requestMessage);
    message.reply(response);
  }
});

client.login(config.token);

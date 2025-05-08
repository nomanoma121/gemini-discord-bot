import { Client, GatewayIntentBits, Events } from "discord.js";
import { getResponse } from "./api";
import config from "../config.json";
import { PROMPT_PREFIX, REFERENCE_PREFIX } from "./constant";

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
  const trimMessage = (content: string) => {
    const trimmedMessage = content.replace(/<@&?(\d+)>/, "").trim();
    return trimmedMessage;
  };

  if (message.author.bot) return;
  if (client.user && message.mentions.has(client.user)) {
    // 返信の場合は参照元を取得
    let referencedMessage = null;
    if (message.reference) {
      if (message.reference?.messageId) {
        referencedMessage = await message.channel.messages.fetch(
          message.reference.messageId
        );
      }
    }
    console.log(`Mentioned by ${message.author.tag}`);
    const trimmedMessage = trimMessage(message.content);
    const requestMessage = `${PROMPT_PREFIX} ${trimmedMessage} ${
      referencedMessage
        ? REFERENCE_PREFIX + trimMessage(referencedMessage.content)
        : ""
    }`;
    console.log(`Request message: ${requestMessage}`);
    const response = await getResponse(requestMessage);
    message.reply(response);
  }
});

client.login(config.token);

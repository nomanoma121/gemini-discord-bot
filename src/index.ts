import { Client, GatewayIntentBits, Events } from 'discord.js';
import config from "../config.json";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
});

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(config.token)

import { Client, GatewayIntentBits, Partials } from 'discord.js';
import commandHandler from './handlers/commandHandler.js';
import eventHandler from './handlers/eventHandler.js';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    partials: [Partials.Channel]
});

commandHandler(client);
eventHandler(client);

const token = process.env.DISCORD_TOKEN;
client.login(token);

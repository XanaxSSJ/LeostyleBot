import { Client, GatewayIntentBits, Partials } from 'discord.js';
import commandHandler from './handlers/commandHandler.js';
import eventHandler from './handlers/eventHandler.js';
import slashCommandHandler from './handlers/slashCommandHandler.js';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    partials: [Partials.Channel]
});

commandHandler(client);
slashCommandHandler(client);
eventHandler(client);

const token = process.env.DISCORD_TOKEN;
client.login(token);

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Bot activo"));
const PORT = 8000;
app.listen(PORT, () => console.log(`Servidor web activo en puerto ${PORT}`));

import { config } from '../config/config.js';

export default async function messageCreate(message, client) {

    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (command) command.execute(message, args, client);


}

import fs from 'fs';

export default function commandHandler(client) {
    client.commands = new Map();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        import(`../commands/${file}`).then(command => {
            client.commands.set(command.default.name, command.default);
        });
    }
}

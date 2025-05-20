import fs from 'fs';

export default function eventHandler(client) {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const eventName = file.split('.')[0];
        import(`../events/${file}`).then(event => {
            client.on(eventName, (...args) => event.default(...args, client));
        });
    }
}

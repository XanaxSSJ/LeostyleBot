export default {
    name: 'streaming',
    description: 'Pone el bot en modo Streaming',
    execute(message, args, client) { // ← Agregado `args`
        client.user.setActivity('a Pelocuca', {
            type: 'STREAMING',
            url: 'https://kick.com/leostyledota'
        });
        message.channel.send('✅ Estado cambiado a: Streaming Pelocuca');
    },
};

export default {
    name: 'watching',
    description: 'Pone el bot en modo Watching: Viendo Tickets',
    execute(message, args, client) { // ← Agregado `args`
        client.user.setActivity('Tickets', { type: 'WATCHING' });
        message.channel.send('✅ Estado cambiado a: Viendo Tickets');
    },
};

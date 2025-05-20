export default {
    name: 'playing',
    description: 'Pone el bot en modo Playing: Jugando a IntelliJ Idea - Bot en Mantenimiento',
    execute(message, args, client) {
        client.user.setActivity('Jugando a IntelliJ Idea - Bot en Mantenimiento', { type: 'PLAYING' });
        message.channel.send('✅ Estado cambiado a: Playing');
    },
};

export default {
    name: 'closeticket',
    async execute(message) {
        if (!message.channel.name.startsWith('ticket-')) {
            return message.reply('❌ Este comando solo puede usarse dentro de un canal de ticket.');
        }

        await message.reply('🛑 Cerrando el ticket en 3 segundos...');

        setTimeout(() => {
            message.channel.delete().catch(console.error);
        }, 3000);
    }
};

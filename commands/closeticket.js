export default {
    name: 'closeticket',
    async execute(message) {
        // Verificar si el canal es un ticket (ya sea de unban o tienda)
        if (!message.channel.name.startsWith('unban-') && !message.channel.name.startsWith('tienda-')) {
            return message.reply('❌ Este comando solo puede usarse dentro de un canal de ticket.');
        }

        // Verificar si el usuario tiene permisos para cerrar el ticket
        if (!message.member.permissions.has('ManageChannels') && 
            !message.member.roles.cache.has(message.client.config.modRoleId) &&
            message.channel.name.split('-')[1] !== message.author.username) {
            return message.reply('❌ No tienes permisos para cerrar este ticket.');
        }

        await message.reply('🛑 Cerrando el ticket en 3 segundos...');

        setTimeout(() => {
            message.channel.delete().catch(console.error);
        }, 3000);
    }
};

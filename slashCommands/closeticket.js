const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('closeticket')
        .setDescription('Cierra un canal de ticket si estás dentro de uno.'),
    
    async execute(interaction) {
        const channel = interaction.channel;

        // Verificar si el canal es un ticket (ya sea de unban o tienda)
        if (!channel.name.startsWith('unban-') && !channel.name.startsWith('tienda-')) {
            return interaction.reply({
                content: '❌ Este comando solo puede usarse dentro de un canal de ticket.',
                flags: MessageFlags.Ephemeral
            });
        }

        // Verificar si el usuario tiene permisos para cerrar el ticket
        if (!interaction.member.permissions.has('ManageChannels') && 
            !interaction.member.roles.cache.has(interaction.client.config.modRoleId) &&
            channel.name.split('-')[1] !== interaction.user.username) {
            return interaction.reply({
                content: '❌ No tienes permisos para cerrar este ticket.',
                flags: MessageFlags.Ephemeral
            });
        }

        await interaction.reply('🛑 Cerrando el ticket en 3 segundos...');

        setTimeout(() => {
            channel.delete().catch(console.error);
        }, 3000);
    }
};

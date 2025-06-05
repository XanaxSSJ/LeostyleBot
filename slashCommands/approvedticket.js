const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const { config } = require('../config/config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('approvedticket')
        .setDescription('Mueve el ticket a la categoría de tickets aprobados')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        try {
            if (!interaction.channel.name.startsWith('tienda-')) {
                return await interaction.reply({
                    content: '❌ Este comando solo puede ser usado en canales de tienda.',
                    flags: MessageFlags.Ephemeral
                });
            }

            // Mover el ticket a la categoría de tickets aprobados
            await interaction.channel.setParent(config.approvedticketCategoryId);
            
            await interaction.reply({
                content: '✅ Ticket movido exitosamente a la categoría de tickets aprobados.',
                flags: MessageFlags.Ephemeral
            });

        } catch (error) {
            console.error('Error al mover el ticket:', error);
            await interaction.reply({
                content: '❌ Ocurrió un error al intentar mover el ticket.',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};

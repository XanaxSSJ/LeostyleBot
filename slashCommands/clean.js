const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clean')
        .setDescription('Elimina una cantidad específica de mensajes en el canal')
        .addIntegerOption(option =>
            option.setName('cantidad')
                .setDescription('Número de mensajes a eliminar (1-100)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        try {
            const cantidad = interaction.options.getInteger('cantidad');
            
            // Verificar permisos
            if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
                return await interaction.reply({
                    content: '❌ No tienes permisos para eliminar mensajes.',
                    flags: MessageFlags.Ephemeral
                });
            }
            // Eliminar mensajes
            const mensajesEliminados = await interaction.channel.bulkDelete(cantidad, true)
                .catch(error => {
                    console.error('Error al eliminar mensajes:', error);
                    throw new Error('No se pudieron eliminar los mensajes. Los mensajes pueden ser muy antiguos (más de 14 días).');
                });

            // Responder al usuario
            await interaction.reply({
                content: `✅ Se han eliminado ${mensajesEliminados.size} mensajes.`,
                flags: MessageFlags.Ephemeral
            });

        } catch (error) {
            console.error('Error en el comando clean:', error);
            await interaction.reply({
                content: `❌ Error: ${error.message}`,
                flags: MessageFlags.Ephemeral
            });
        }
    }
};

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketsetup')
        .setDescription('Configura el sistema de tickets en el canal actual')
        .addStringOption(option =>
            option.setName('tipo')
                .setDescription('Tipo de ticket a configurar')
                .setRequired(true)
                .addChoices(
                    { name: '🎫 Unban', value: 'unban' },
                    { name: '🛍️ Tienda', value: 'shop' }
                ))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const tipo = interaction.options.getString('tipo');
        
        // Verificar que el canal sea apropiado para el tipo de ticket
        if (tipo === 'unban' && !interaction.channel.name.toLowerCase().includes('unban')) {
            return interaction.reply({
                content: '❌ Este tipo de ticket solo puede configurarse en canales de unban.',
                flags: MessageFlags.Ephemeral
            });
        }
        
        if (tipo === 'shop' && !interaction.channel.name.toLowerCase().includes('tienda')) {
            return interaction.reply({
                content: '❌ Este tipo de ticket solo puede configurarse en canales de tienda.',
                flags: MessageFlags.Ephemeral
            });
        }

        // Configuración según el tipo de ticket
        const config = {
            unban: {
                button: {
                    customId: 'create_ticket_unban',
                    label: '🎫 Solicitar Unban',
                    style: ButtonStyle.Danger,
                    color: '#ff0000',
                    title: '🎫 Sistema de Tickets Unban',
                    description: 'Si has sido baneado y deseas solicitar un unban, haz clic en el botón de abajo.'
                }
            },
            shop: {
                button: {
                    customId: 'create_ticket_shop',
                    label: '🛍️ Comprar Items',
                    style: ButtonStyle.Success,
                    color: '#00ff00',
                    title: '🛍️ Sistema de Tickets Tienda',
                    description: 'Para realizar una compra, haz clic en el botón de abajo.'
                }
            }
        };

        const ticketConfig = config[tipo];

        // Crear el botón
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(ticketConfig.button.customId)
                .setLabel(ticketConfig.button.label)
                .setStyle(ticketConfig.button.style)
        );

        // Crear el embed
        const embed = new EmbedBuilder()
            .setColor(ticketConfig.button.color)
            .setTitle(ticketConfig.button.title)
            .setDescription(ticketConfig.button.description)
            .setFooter({ text: 'Solo se permite un ticket abierto por usuario' });

        // Enviar el mensaje
        await interaction.channel.send({ embeds: [embed], components: [row] });
        
        // Confirmar al usuario
        await interaction.reply({
            content: `✅ Sistema de tickets de ${tipo === 'unban' ? 'unban' : 'tienda'} configurado correctamente.`,
            flags: MessageFlags.Ephemeral
        });
    }
}; 
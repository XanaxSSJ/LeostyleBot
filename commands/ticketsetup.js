import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

export default {
    name: 'ticketsetup',
    execute(message) {
        // Botón para tickets de unban
        const unbanRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('create_ticket_unban')
                .setLabel('🎫 Solicitar Unban')
                .setStyle(ButtonStyle.Danger)
        );

        // Botón para tickets de tienda
        const shopRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('create_ticket_shop')
                .setLabel('🛍️ Solicitar Items')
                .setStyle(ButtonStyle.Success)
        );

        // Embed para tickets de unban
        const unbanEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('🎫 Sistema de Tickets Unban')
            .setDescription('Si has sido baneado y deseas solicitar un unban, haz clic en el botón de abajo.')
            .setFooter({ text: 'Solo se permite un ticket abierto por usuario' });

        // Embed para tickets de tienda
        const shopEmbed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('🛍️ Sistema de Tickets Tienda')
            .setDescription('Para pedir tu compra, haz clic en el botón de abajo.')
            .setFooter({ text: 'Solo se permite un ticket abierto por usuario' });

        // Enviar los mensajes en el canal correspondiente
        if (message.channel.name.toLowerCase().includes('unban')) {
            message.channel.send({ embeds: [unbanEmbed], components: [unbanRow] });
        } else if (message.channel.name.toLowerCase().includes('tienda')) {
            message.channel.send({ embeds: [shopEmbed], components: [shopRow] });
        } else {
            message.reply('❌ Este comando solo puede usarse en canales de unban o tienda.');
        }
    }
};

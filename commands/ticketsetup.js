import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
    name: 'ticketsetup',
    execute(message) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('create_ticket')
                .setLabel('🎫 Crear Ticket')
                .setStyle(ButtonStyle.Primary)
        );

        message.channel.send({ content: 'Haz clic en el botón para crear un ticket:', components: [row] });
    }
};

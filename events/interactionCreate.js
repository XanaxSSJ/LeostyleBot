import { ChannelType, PermissionFlagsBits } from 'discord.js';
import { config } from '../config/config.js';

export default async function interactionCreate(interaction, client) {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'create_ticket') {
        const existing = interaction.guild.channels.cache.find(c =>
            c.name === `ticket-${interaction.user.id}`
        );

        if (existing) {
            return interaction.reply({ content: '❌ Ya tienes un ticket abierto.', ephemeral: true });
        }

        const ticketChannel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: config.ticketCategoryId,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ReadMessageHistory
                    ],
                },
                {
                    id: config.modRoleId,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ManageMessages,
                        PermissionFlagsBits.ReadMessageHistory
                    ],
                }
            ]
        });

        await ticketChannel.send(`🎟️ <@${interaction.user.id}> Un moderador atenderá tu solicitud pronto. Cierra el ticket con **closetickets`);
        await interaction.reply({ content: `✅ Ticket creado: ${ticketChannel}`, ephemeral: true });
    }
}

import { ChannelType, PermissionFlagsBits, MessageFlags } from 'discord.js';
import { config } from '../config/config.js';

export default async function interactionCreate(interaction, client) {
    try {
        // Manejo de comandos slash
        if (interaction.isChatInputCommand()) {
            const command = client.slashCommands.get(interaction.commandName);
            
            if (!command) {
                console.error(`No se encontró el comando ${interaction.commandName}`);
                return interaction.reply({ 
                    content: '❌ Hubo un error al ejecutar este comando.', 
                    flags: MessageFlags.Ephemeral
                });
            }

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(`Error al ejecutar el comando ${interaction.commandName}:`, error);
                await interaction.reply({ 
                    content: '❌ Hubo un error al ejecutar este comando.', 
                    flags: MessageFlags.Ephemeral
                });
            }
            return;
        }

        if (!interaction.isButton()) return;

        // Mapeo de tipos de tickets a sus configuraciones
        const ticketTypes = {
            'create_ticket_unban': {
                categoryId: config.ticketUnbanCategoryId,
                channelName: `unban-${interaction.user.username}`,
                initialMessage: '🎫 Un moderador revisará tu solicitud de unban pronto.'
            },
            'create_ticket_shop': {
                categoryId: config.ticketShopCategoryId,
                channelName: `tienda-${interaction.user.username}`,
                initialMessage: '🛍️ Un moderador atenderá tu solicitud de tienda pronto.'
            }
        };

        const ticketConfig = ticketTypes[interaction.customId];
        if (!ticketConfig) return;

        const existing = interaction.guild.channels.cache.find(c =>
            c.name === ticketConfig.channelName
        );

        if (existing) {
            return interaction.reply({ 
                content: '❌ Ya tienes un ticket abierto.', 
                flags: MessageFlags.Ephemeral
            });
        }

        const ticketChannel = await interaction.guild.channels.create({
            name: ticketConfig.channelName,
            type: ChannelType.GuildText,
            parent: ticketConfig.categoryId,
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

        await ticketChannel.send(`🎟️ <@${interaction.user.id}> ${ticketConfig.initialMessage}`);
        await interaction.reply({ 
            content: `✅ Ticket creado: ${ticketChannel}`, 
            flags: MessageFlags.Ephemeral
        });
    } catch (error) {
        console.error('Error en interactionCreate:', error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ 
                content: '❌ Hubo un error al procesar esta interacción.', 
                flags: MessageFlags.Ephemeral
            });
        } else {
            await interaction.reply({ 
                content: '❌ Hubo un error al procesar esta interacción.', 
                flags: MessageFlags.Ephemeral
            });
        }
    }
}

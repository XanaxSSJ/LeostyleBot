import { ChannelType, PermissionFlagsBits } from 'discord.js';
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
                    withResponse: true
                });
            }

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(`Error al ejecutar el comando ${interaction.commandName}:`, error);
                await interaction.reply({ 
                    content: '❌ Hubo un error al ejecutar este comando.', 
                    withResponse: true
                });
            }
            return;
        }

        if (!interaction.isButton()) return;

        if (interaction.customId === 'create_ticket') {
            const existing = interaction.guild.channels.cache.find(c =>
                c.name === `ticket-${interaction.user.username}`
            );

            if (existing) {
                return interaction.reply({ 
                    content: '❌ Ya tienes un ticket abierto.', 
                    withResponse: true
                });
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
            await interaction.reply({ 
                content: `✅ Ticket creado: ${ticketChannel}`, 
                withResponse: true
            });
        }
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
                withResponse: true
            });
        }
    }
}

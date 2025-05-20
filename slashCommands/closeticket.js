const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('closeticket')
        .setDescription('Cierra un canal de ticket si estás dentro de uno.'),
    
    async execute(interaction) {
        const channel = interaction.channel;

        if (!channel.name.startsWith('ticket-')) {
            return interaction.reply({
                content: '❌ Este comando solo puede usarse dentro de un canal de ticket.',
                ephemeral: true
            });
        }

        await interaction.reply('🛑 Cerrando el ticket en 3 segundos...');

        setTimeout(() => {
            channel.delete().catch(console.error);
        }, 3000);
    }
};

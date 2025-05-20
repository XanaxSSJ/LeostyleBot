import { ActivityType } from 'discord.js';

export default {
    name: 'setstatus',
    description: 'Cambia el estado del bot, con textos por defecto si no pasas mensaje',
    async execute(message, args) {
        if (!message.member.permissions.has('Administrator')) {
            return message.reply('❌ No tienes permisos para usar este comando.');
        }

        const defaults = {
            playing: {
                type: ActivityType.Playing,
                text: 'IntelliJ IDEA - Bot en Mantenimiento'
            },
            watching: {
                type: ActivityType.Watching,
                text: 'Revisando Tickets'
            },
            streaming: {
                type: ActivityType.Streaming,
                text: 'https://kick.com/leostyledota'
            },
            listening: {
                type: ActivityType.Listening,
                text: 'Escuchando al staff'
            },
            competing: {
                type: ActivityType.Competing,
                text: 'Compitiendo por soporte'
            }
        };

        const [type, ...textParts] = args;
        if (!type || !defaults[type]) {
            return message.reply(
                `❌ Uso correcto: \`**setstatus <playing|watching|streaming|listening|competing> [mensaje]\``
            );
        }

        const text = textParts.length > 0
            ? textParts.join(' ')
            : defaults[type].text;

        await message.client.user.setActivity(text, { type: defaults[type].type });
        message.reply(`✅ Estado actualizado a "${type}" con mensaje: ${text}`);
    }
};

import fs from 'fs';
import path from 'path';

export default async function slashCommandHandler(client) {
    try {
        client.slashCommands = new Map();
        
        const commandsPath = './slashCommands';
        if (!fs.existsSync(commandsPath)) {
            throw new Error(`El directorio ${commandsPath} no existe`);
        }

        const slashCommandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        
        const importPromises = slashCommandFiles.map(async (file) => {
            try {
                const filePath = path.join(commandsPath, file);
                const module = await import(`../${filePath}`);
                const command = module.default; 
                
                if (!command.data || !command.data.name) {
                    throw new Error(`El comando en ${file} no tiene la estructura correcta`);
                }
                
                client.slashCommands.set(command.data.name, command);
                console.log(`Comando slash cargado: ${command.data.name}`);
            } catch (error) {
                console.error(`Error al cargar el comando ${file}:`, error);
            }
        });

        await Promise.all(importPromises);
        console.log(`Se cargaron ${client.slashCommands.size} comandos slash`);
        
    } catch (error) {
        console.error('Error al cargar los comandos slash:', error);
        throw error;
    }
}

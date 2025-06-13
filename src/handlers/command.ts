import * as fs from 'node:fs';
import * as path from 'node:path';
import { Collection } from 'discord.js';
import { ExtendedClient } from '../structures/ExtendedClient';
import { pathToFileURL } from 'url';

export default (client: ExtendedClient) => {
    client.commands = new Collection();

    const foldersPath = path.join(__dirname, '..', 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith('.js') || file.endsWith('.ts'));

        for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        // Use dynamic import to load command modules (since require may not work well in ESM/TS)
        const fileUrl = pathToFileURL(filePath).href;
        import(fileUrl).then(commandModule => {
            const command = commandModule.default ?? commandModule;
            if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            } else {
            console.warn(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
            }
        });
        }
    }
};
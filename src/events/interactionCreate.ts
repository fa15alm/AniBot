import { 
    Events, 
    Interaction, 
    Collection, 
    MessageFlags
} from 'discord.js';
import { ExtendedClient } from '../structures/ExtendedClient';
import { Command } from '../types/Command';
import * as config from '../../config.json';

const defaultCooldownDuration = config.defaultCooldownDuration;

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand() && 
            !interaction.isAutocomplete()) return;

        const client = interaction.client as ExtendedClient;

        if (interaction.isAutocomplete()) {
            const command = client.commands.get(interaction.commandName) as Command;
            if (!command) return;

            try {
                if (command.autocomplete) {
                    await command.autocomplete(interaction);
                }
            } catch (e) {
                return;
            }
            return;
        }

        const command = client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        if(command.type==='dev'){
            if (!config.devs.includes(interaction.user.id)) {
                return await interaction.reply({ content: `You do not have permission to use this command.`, flags: [ MessageFlags.Ephemeral ] })
            }
            await command.execute(interaction);
            return;
        }

        // Setup cooldowns collection if not exists
        if (!client.cooldowns.has(command.data.name)) {
            client.cooldowns.set(command.data.name, new Collection<string, number>());
        }

        const now = Date.now();
        const timestamps = client.cooldowns.get(command.data.name)!;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id)! + cooldownAmount;
            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({ 
                content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, 
                flags: [ MessageFlags.Ephemeral ]
                });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        try {
            await command.execute(interaction);
        } catch (error) {
            console.warn(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ 
                content: 'There was an error while executing this command!', 
                flags: [ MessageFlags.Ephemeral ] 
                });
            } else {
                await interaction.reply({ 
                content: 'There was an error while executing this command!', 
                flags: [ MessageFlags.Ephemeral ]
                });
            }
        }
    }
};

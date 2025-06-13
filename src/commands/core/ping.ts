import { SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction } from 'discord.js';
import { Command } from '../../types/Command';

export default {
    type: 'core',
    usage: 'ping',
    access: 'Members',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pings the bot'),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply('Pong!');
    },
};
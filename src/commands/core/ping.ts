import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../types/Command';

const command: Command = {
    type: 'core',
    usage: 'ping',
    access: 'Members',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pings the bot'),

    async execute(interaction: ChatInputCommandInteraction) {
        interaction.reply('Pong!');
    },
};

export default command;
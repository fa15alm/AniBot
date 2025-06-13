import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

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
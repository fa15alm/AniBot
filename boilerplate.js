const { SlashCommandBuilder } = require("discord.js");
const config = require('../../config.json');

module.exports = {
    type: 'type',
    usage: 'usage',
    access: 'access',
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('description'),

    async execute(interaction) {
        // CODE HERE
  },
};
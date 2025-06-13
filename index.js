const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./token.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
    ],
    partials: [
        Partials.Channel,
        Partials.Reaction,
        Partials.Message
    ] 
});

client.cooldowns = new Collection();
['command', 'event'].forEach(x => require(`./handlers/${x}`)(client));
client.login(token);
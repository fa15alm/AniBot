import 'dotenv/config';
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';

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


client.once(Events.ClientReady, (client) => {
    console.log('Ready!');
});

client.login(process.env.TOKEN);
import 'dotenv/config';
import { Events, GatewayIntentBits, Partials, Collection } from 'discord.js';
import { ExtendedClient } from './structures/ExtendedClient';

const client = new ExtendedClient({
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


//client.cooldowns = new Collection();
//['command', 'event'].forEach(x => require(`./handlers/${x}`)(client));

client.once(Events.ClientReady, (client) => {
    console.log('Ready!');
});

// commandHandler(client);
// eventHandler(client);

client.login(process.env.TOKEN);
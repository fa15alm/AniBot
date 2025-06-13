import { Events, ChannelType, Message } from 'discord.js';
import * as config from '../../config.json';

export default {
    name: Events.MessageCreate,
    
    async execute(message: Message) {
        if(message.author.bot) {return;}
        if(message.channel.type === ChannelType.DM ) { 
            return;
        }
        if(message.channel.type === ChannelType.GuildText) {
            message.reply('hi!');
        }
    },
};
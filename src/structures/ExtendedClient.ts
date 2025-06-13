import { Client, Collection, ClientOptions } from 'discord.js';
import { Command } from '../types/Command';

export class ExtendedClient extends Client {
    public cooldowns: Collection<string, number>;
    public commands: Collection<string, Command>;

    constructor(options: ClientOptions) {
        super(options);
        this.cooldowns = new Collection();
        this.commands = new Collection();
    }
}

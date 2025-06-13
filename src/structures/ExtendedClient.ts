import { Client, Collection, ClientOptions } from 'discord.js';

export class ExtendedClient extends Client {
    public cooldowns: Collection<string, number>;

    constructor(options: ClientOptions) {
        super(options);
        this.cooldowns = new Collection();
    }
}

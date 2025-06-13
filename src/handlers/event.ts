import * as fs from 'node:fs';
import * as path from 'node:path';
import { ExtendedClient } from '../structures/ExtendedClient';
import { Event } from '../types/Event';
import { pathToFileURL } from 'url';

export default async (client: ExtendedClient) => {
  const eventsPath = path.join(__dirname, '..', 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const fileUrl = pathToFileURL(filePath).href;
    const eventModule = await import(fileUrl);
    const event: Event = eventModule.default ?? eventModule;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
};

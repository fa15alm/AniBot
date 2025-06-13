import { Events, ActivityType, PresenceUpdateStatus } from 'discord.js';
import { ExtendedClient } from '../structures/ExtendedClient';

export default {
	name: Events.ClientReady,
	once: true,
	execute(client: ExtendedClient) {
		console.log(`Ready! Logged in as ${client.user?.tag}`);
		client.user?.setPresence({
		activities: [{ name: 'AniBot', type: ActivityType.Playing }],
		status: PresenceUpdateStatus.DoNotDisturb,
		});
	},
};
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface Command {
  type: string;
  usage: string;
  access: string;
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
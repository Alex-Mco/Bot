const fs = require('node:fs')
const path = require('node:path')
const { SlashCommandBuilder } = require('discord.js')
//const { client } = require('../../index.js')
//Loop through the other descriptions for the correct way

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Gives a summary of commands.'),
	async execute(interaction) {
		const commands = interaction.client.commands.map(command => ({
			name: command.data.name,
			description: command.data.description,
		}));
        const commandList = commands.map(cmd => `/${cmd.name}: ${cmd.description}`).join('\n');;
		await interaction.reply(commandList);
	},
}
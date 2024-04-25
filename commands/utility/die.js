const { SlashCommandBuilder, Client } = require('discord.js')
const { token } = require('../../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('die')
		.setDescription('Kills the bot, will no longer accept commands.'),
	async execute(interaction, client) {
		
		await interaction.reply({content: 'Killing the bot...'})
		await process.exit()
		//Kills the process for the bot so no more commands can be executed
	}

} 
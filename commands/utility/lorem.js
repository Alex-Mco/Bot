const { SlashCommandBuilder } = require('discord.js')
const { loremIpsum } = require ('lorem-ipsum')
const loremText = loremIpsum()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lorem')
		.setDescription('Produces lorem ipsum sentence.'),
	async execute(interaction) {
		// Generate Lorem Ipsum text
		await interaction.reply(loremText);},
}
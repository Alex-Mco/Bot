const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dadjoke')
		.setDescription('Says a random dad joke.'),
	async execute(interaction) {
		try {
            // Fetch a random dad joke from the API
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();

            // Send the dad joke to the channel where the message was sent
            await interaction.reply(data.joke);
        } catch (error) {
            console.error('Error fetching dad joke:', error);
            await interaction.reply('Sorry, I couldn\'t fetch a dad joke at the moment. Please try again later.');
        }},
}
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const weather = require('weather-js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Gives weather report')
		.addStringOption(option =>
			option.setName('location')
			.setDescription('The location to check the weather')
			.setRequired(true)),
	async execute(interaction) {
		const location = interaction.options.getString('location')
		await interaction.reply('Getting weather report...')
		await weather.find({search: `${location}`, degreeType: 'F'}, async function(err, result){
			setTimeout(()=>{
				if(err){
					console.log(err)
					interaction.editReply({content: `${err} | Because data is being pulled, sometimes things go wrong try command again.`})
				}
				else{
					if(result.length == 0){
						return interaction.editReply({content: `Could not find the weather of ${location}`})
					}
					else{
						const temp = result[0].current.temperature
						const type = result[0].current.skytext
						const name = result[0].location.name
						const feel = result[0].current.feelslike
						const wind = result[0].current.winddisplay
						const weatherString = `Weather of ${name}\n\nTempature: ${temp} F\nFeels like: ${feel} F\nWeather: ${type}\nWind Speed and direction: ${wind}`

						interaction.editReply(weatherString)
					}
				}
			}, 2000)
		})
	},
}
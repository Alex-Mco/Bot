const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')
const path = require('path')
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music')
		.setDescription('Plays a random song from a list of MP3 files'),

	async execute(interaction) {
		// Check if the user is in a voice channel
		if (!interaction.member || !interaction.member.voice || !interaction.member.voice.channel) {
			return interaction.reply("You must be in a voice channel.")
		}

		const voiceChannel = interaction.member.voice.channel
		const mp3FilesPath = './mp3Files/'
		const mp3Files = fs.readdirSync(mp3FilesPath).filter(file => file.endsWith('.mp3'))

		if (mp3Files.length === 0) {
			return interaction.reply('No MP3 files found.')
		}

		const randomIndex = Math.floor(Math.random() * mp3Files.length)
		const randomFile = mp3Files[randomIndex]
		const filePath = path.join(mp3FilesPath, randomFile)

		try {
			const player = createAudioPlayer()
			const resource = createAudioResource('D:/For_School/Spring2024/CS3380/discord-bot/mp3Files/Tequila.mp3')
			console.log('Audio resource created successfully:', resource);
			const connection = joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: voiceChannel.guild.id,
				adapterCreator: voiceChannel.guild.voiceAdapterCreator,
			})
			connection.subscribe(player)
			player.play(resource)
			interaction.reply('Playing...')
		} catch (error) {
			console.error(error)
			interaction.reply('An error occurred while playing the song.')
		}
	},
}


//ELEPHANT GRAVYARD

// .addStringOption(option =>
// 	option.setName('query')
// 	.setDescription('The song you want to play')
// 	.setRequired(true)),
// async execute(interaction) {
// const player = useMainPlayer()
// const channel = interaction.member.voice.channel
// if (!channel) return interaction.reply('You are not connected to a voice channel!') // make sure we have a voice channel
// const query = interaction.options.getString('query', true) // we need input/query to play
// // let's defer the interaction as things can take time to process
// await interaction.deferReply()
// try {
// 	const { track } = await player.play(channel, query, {
// 		nodeOptions: {
// 			// nodeOptions are the options for guild node (aka your queue in simple word)
// 			metadata: interaction // we can access this metadata object using queue.metadata later on
// 		}
// 	})
// 	return interaction.followUp(`**${track.title}** enqueued!`)
// } catch (e) {
// 	// let's return error if something failed
// 	return interaction.followUp(`Something went wrong: ${e}`)
// }
// },




// interaction.client.player.extractors.loadDefault()
// 		if (!interaction.member.voice.channel) {
// 			return void interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true })
// 		}
// 		const query = interaction.options.get('query').value
//     	const searchResult = await interaction.client.player
// 			.search(query, {
// 				requestedBy: interaction.user,
// 				searchEngine: QueryType.AUTO
// 			})
// 			.catch(() => {})
//     	if (!searchResult || !searchResult.tracks.length) return void interaction.followUp({ content: 'No results were found!' })
// 		const queue = await interaction.client.player.createQueue(interaction.guild, {
//             metadata: interaction.channel
//         })
// 		try {
// 			if (!queue.connection) await queue.connect(interaction.member.voice.channel)
// 		} catch {
// 			void interaction.client.player.deleteQueue(interaction.guildId)
// 			return void interaction.followUp({ content: 'Could not join your voice channel!' })
// 		}
// 		await interaction.followUp({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` })
// 		searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0])
// 		if (!queue.playing) await queue.play()
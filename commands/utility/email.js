const { SlashCommandBuilder } = require('discord.js')
const { email, emailPass } = require('../../config.json')
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: email,
		pass: emailPass,
	},
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('email')
		.setDescription('Sends an email')
		.addStringOption(option =>
			option
				.setName('recipient')
				.setDescription('The email address of the person you are emailing')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('message')
				.setDescription('The message for the email')
				.setRequired(true)),
	async execute(interaction) {
		const toEmail = interaction.options.getString('recipient')
		const msg = interaction.options.getString('message')
		const mailOptions = {
			from: email,
			to: toEmail,
			subject: 'CS3880 bot message',
			text: msg
		  }
		await interaction.reply('Sending email...')
		.then(await transporter.sendMail(mailOptions))
		.then(interaction.editReply({content: 'Email sent!'}))
		},
}
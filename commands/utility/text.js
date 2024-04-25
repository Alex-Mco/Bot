const { SlashCommandBuilder } = require('discord.js')
const { email, emailPass } = require('../../config.json')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email,
        pass: emailPass,
    },
})

// Generate choice objects for carriers
const carrierChoices = Object.entries(carrierDomains).map(([carrier, domain]) => ({ name: carrier, value: carrier }))

module.exports = {
    data: new SlashCommandBuilder()
        .setName('text')
        .setDescription('Sends a text message')
        .addStringOption(option =>
            option
                .setName('phonenumber')
                .setDescription('The phone number of the recipient')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('carrier')
                .setDescription('The carrier of the recipient')
                .setRequired(true)
                .addChoices(
                    { name: 'Verizon', value: 'vtext.com' },
                    { name: 'AT&T', value: 'txt.att.net' },
                    { name: 'T-Mobile', value: 'tmomail.net' },))
        .addStringOption(option =>
            option
                .setName('msg')
                .setDescription('The message to send')
                .setRequired(true)),
    async execute(interaction) {
        const phoneNumber = interaction.options.getString('phonenumber')
        const carrier = interaction.options.getString('carrier')
        const messageBody = interaction.options.getString('msg')

        // Retrieve carrier domain from the map
        const carrierDomain = carrierDomains[carrier]

        try {
            const mailOptions = {
                from: email,
                to: `${phoneNumber}@${carrierDomain}`,
                subject: 'Message from Discord bot',
                text: messageBody
            }

            await interaction.reply('Sending text message...')
            await transporter.sendMail(mailOptions)
            await interaction.editReply({ content: 'Text message sent!' })
        } catch (error) {
            console.error(error)
            await interaction.editReply({ content: 'Error occurred while sending the text message.' })
        }
    },
}
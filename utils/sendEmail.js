const nodemailer = require("nodemailer")

const sendEmail = async (to, messageContent) => {
    try {
        
        // create transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        })

        // message object
        const message = {
            to, 
            subject: "Testing Subject",
            html: `
            <h3>Test Heading</h3>
            <p>${messageContent}</p>
            `
        }

        // send the email
        const info = await transporter.sendMail(message)
        console.log('Message sent', info.messageId);

    } catch (error) {
        console.log(error);
        throw new Error('Email could not be sent')
    }
}

module.exports = sendEmail
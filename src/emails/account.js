 const sgMail = require('@sendgrid/mail')
const { model } = require('mongoose')

//const sendGridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {

    sgMail.send({
        to : 'suresh.gnanasekaran@gmail.com',
        from : 'suresh.gnanasekaran@adp.com',
        subject : 'nodejs testing',
        text : `My first node js email  ${name}`
    
    })

}

const sendCancellationEmail = (email, name) => {

    sgMail.send({
        to : 'suresh.gnanasekaran@gmail.com',
        from : 'suresh.gnanasekaran@adp.com',
        subject : 'nodejs testing',
        text : `Cancelling the registration email  ${name}`
    
    })

}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail

}
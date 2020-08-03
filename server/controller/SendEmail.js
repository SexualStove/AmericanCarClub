module.exports = {
    async sendMail() {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
            host: "smtpauth.discountdomains.co.nz",
            port: 587,
            secure: false,
            auth: {
                user: 'contact@inhouseweb.nz', // generated ethereal user
                pass: 'buster' // generated ethereal password
            }
        });
        // send mail with defined transport object
        transporter.sendMail({
            from: '"contact" <contact@inhouseweb.nz>',
            to: "rt_condon@hotmail.com",
            subject: "Test email",
            text: "Hello world"
        });
    }

};
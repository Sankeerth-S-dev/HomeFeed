const nodemailer = require('nodemailer');

const sendVerificationEmail = async (to, token) => {
    const link = `${process.env.SERVER_URL}/auth/verify?token=${token}`;

    if(!process.env.EMAIL_USER){
        console.log("\nVERIFY LINK: " , link, "\n");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: `"HomeFeed" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Verify your email for HomeFeed',
        html: `<p>Welcome to HomeFeed! Click to verify your email: </p><a href = "${link}">Verify my email</a> <p>This link expires in 24 hours.</p?>`,
    });
};

module.exports = { sendVerificationEmail };
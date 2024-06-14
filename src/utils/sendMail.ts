import transporter from "../configs/nodeMailer.config";

export default async function sendEmail(mailOptions: {}): Promise<void> {  
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email", error);
        throw new Error(`Error sending email: ${error}`);
    }
}
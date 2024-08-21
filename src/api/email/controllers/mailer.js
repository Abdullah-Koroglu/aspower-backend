const sendEmail = require('../../../../config/functions/email');
const fs = require('fs');
const path = require('path');

module.exports = {
  async send(ctx) {
    const { email, subject, message } = ctx.request.body;
    
    if (!ctx.request.files || !ctx.request.files.attachment) {
      return ctx.send({ message: 'No files were uploaded.' }, 400);
    }

    const file = ctx.request.files.attachment;

    // Read the file content (assuming a single file upload)
    const fileContent = fs.readFileSync(file.path);

    // Create an attachment object for Nodemailer
    const attachments = [
      {
        filename: file.name,
        content: fileContent,
        contentType: file.type,
      },
    ];

    // Send the email with the attachment
    await sendEmail(email, subject, message, attachments);

    // Return a response
    return ctx.send({ message: 'Email sent successfully with attachment!' });

  },
  async sendForContactForm(ctx) {  
    const {
      name,
      email,
      phone,
      subject,
      message,
      consent,
      emailSubscription,
    } = ctx.request.body;

    // if (!consent) {
    //   return ctx.send({ message: 'You must accept the terms to proceed.' }, 400);
    // }

    const messageContent = `
      İsim: ${name}
      E-posta: ${email}
      Telefon: ${phone}
      Konu: ${subject}
      Mesaj: ${message}
      Onay: ${consent ? 'Evet' : 'Hayır'}
      E-posta Aboneliği: ${emailSubscription ? 'Evet' : 'Hayır'}
    `;

    // Send the email
    await sendEmail(email, subject, messageContent);

    // Return a response
    return ctx.send({ message: 'Email sent successfully!' });


  },

  async sendForSupportForm(ctx) {
    const {
      firmName,
      responsibleName,
      email,
      phone,
      city,
      deviceModel,
      deviceSerial,
      batteryType,
      alarmMessage,
      batteryCount,
      deviceCount,
      description,
    } = ctx.request.body;
    

    const message = `
      Firma Adı: ${firmName}
      Yetkili / İlgili Adı: ${responsibleName}
      E-posta: ${email}
      Telefon: ${phone}
      Şehir: ${city}
      Cihaz Modeli: ${deviceModel}
      Cihaz Seri No: ${deviceSerial}
      Akü Tipi & Sayısı: ${batteryType} - ${batteryCount}
      Alarm Mesajı: ${alarmMessage}
      Arıza Veren Cihaz Adedi: ${deviceCount}
      Açıklama: ${description}
      `;
  
      let attachments = [];
      if (ctx.request.files && ctx.request.files.attachment) {
        const file = ctx.request.files.attachment;
        const fileContent = fs.readFileSync(file.path);
        attachments = [
          {
            filename: file.name,
            content: fileContent,
            contentType: file.type,
          },
        ];
      }

    await sendEmail(email, 'Support Form Submission', message, attachments);

    return ctx.send({ message: 'Email sent successfully!' });
  }
};
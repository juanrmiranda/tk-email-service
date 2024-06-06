const transporter = require('../config/mail');
const { compile } = require('handlebars');
const { getTemplateFromDatabase } = require('./templateService');

const sendEmail = async (to, subject, templateName, context) => {
  const mailOptions = {
    from: process.env.SMTP_FROMUSER,
    to,
    subject,
    template: templateName,
    context,
  };

  return transporter.sendMail(mailOptions);
};

const sendEmailWithTemplate = async (to, subject, templateId, context) => {
  try {
    // Obtener la plantilla desde la base de datos
    const templateContent = await getTemplateFromDatabase(templateId);
    const compiledTemplate = compile(templateContent);

    const mailOptions = {
      from: process.env.SMTP_FROMUSER,
      to,
      subject,
      html: compiledTemplate(context),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el email:', error);
    throw error;
  }
};


module.exports = {
  sendEmail,
  sendEmailWithTemplate
};

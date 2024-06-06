require('dotenv').config();
const {setupTemplateEngine} = require('./services/templateService');
const { sendEmail,sendEmailWithTemplate } = require('./services/emailService');

setupTemplateEngine();

const sendTestEmail = async () => {
  try {
    await sendEmail(
      'facturacion.electronica@cajazacate.com.sv',
      'Test Email',
      'email', // Nombre de la plantilla sin extensión
      { title: 'John Doe', message: 'here goes the message' } // Contexto para la plantilla
    );
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


const sendTestEmailWithDatabaseTemplate = async () => {
    try {
      const templateId = '1'; // ID de la plantilla en la base de datos
      const context = { title: 'John Doe', message: 'here goes the message' };
  
      await sendEmailWithTemplate(
        'facturacion.electronica@cajazacate.com.sv',
        'Test Email',
        templateId,
        context
      );
      console.log('Email sent successfully with database template');
    } catch (error) {
      console.error('Error sending email with database template:', error);
    }
  };

sendTestEmailWithDatabaseTemplate();

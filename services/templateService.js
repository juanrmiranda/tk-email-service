const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const transporter = require('../config/mail');
const { pool } = require('../config/database');

const setupTemplateEngine = () => {
  transporter.use('compile', hbs({
    viewEngine: {
      extname: '.hbs',
      layoutsDir: path.join(__dirname, '../templates'),
      defaultLayout: '',
    },
    viewPath: path.join(__dirname, '../templates'),
    extName: '.hbs'
  }));
};


async function getTemplateFromDatabase(templateId) {
  
  const client = await pool.connect();
  

  try {
    const result = await client.query('SELECT template FROM generales.plantillas_hbs WHERE id = $1', [templateId]);
    if (result.rows.length > 0) {
      return result.rows[0].template;
    } else {
      throw new Error('No se encontró ninguna plantilla con el ID proporcionado.');
    }
  } catch (error) {
    throw new Error(`Error al obtener la plantilla desde la base de datos: ${error.message}`);
  } finally {
    await client.end();
  }
}


module.exports = {
  getTemplateFromDatabase,
  setupTemplateEngine
};
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


// Разбор тела запроса в формате JSON
app.use(bodyParser.json());
 
// Разбор тела запроса в формате x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
// Мiddleware для статических файлов
app.use(express.static(path.join(__dirname, 'public')));


// Обработчик POST запроса на путь "/form"
app.post('/form',async (req, res) => {

  const inputData = req.body; // Получение данных из тела запроса
  console.log(inputData); // Вывод данных в консоль сервера
  try {
    // Получаем данные из тела запроса
    const inputData = req.body;
    
    // Инициализируем транспорт Nodemailer
    const transporter = nodemailer.createTransport({
      host: "mail.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "consolidationtlt@yandex.ru", // generated ethereal user
        pass: "2ppJ*WZMM.%q_@." // generated ethereal password
        
      }
    });
    
    // Формируем объект письма
    const mailOptions = {
    from: 'consolidationtlt@yandex.ru', // От кого
    to: "consolidationtlt@mail.ru'", // Кому
    subject: "consolidation info", // Тема
    text: inputData.message // Текст письма
    };
    
    // Отправляем письмо
    await transporter.sendMail(mailOptions);
    
    // Отправляем ответ клиенту
    res.send('Письмо успешно отправлено!');
    } catch (error) {
    console.error(error);
    res.send('Ошибка при отправке письма!');
    }
    });

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

app.get('/main.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'main.css'));
});
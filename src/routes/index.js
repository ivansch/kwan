const {
  Router
} = require('express');
const router = Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var mailAccountUser = 'somoskwan@gmail.com'
var mailAccountPassword = '16102006pincha'

var toEmailAddress = 'somoskwan@gmail.com'

onclick = 'buildlist("YourCheckBoxName","selectedValues");'

function buildlist(listName, labelName) {
  var controls = document.getElementsByName(listName);
  var label = document.getElementsByName(labelName);
  label.value = '';
  for (var i = 0; i < controls.length; i++) {
    label.value += controls[i].value.toString() + ',';
  }
}
router.post('/send-email', async (req, res) => {
  const {
    selectedValues,
    name,
    email,
    phone,
    message
  } = req.body;
  var fromEmail = ` ${email}`;
  contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Servicios: ${selectedValues}</li>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;
  var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: mailAccountUser,
      pass: mailAccountPassword
    }
  }))

  var mail = {
    from: fromEmail,
    to: toEmailAddress,
    subject: "Kwan",
    text: "Contacto",
    html: contentHTML
  }

  transport.sendMail(mail, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response.message);
    }

    transport.close();
  });
  res.redirect('/success.html');
});

module.exports = router;

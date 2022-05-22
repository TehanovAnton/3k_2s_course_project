const mailer = require('../initializers/nodemialer')

async function parkServiceCreated(message, parkservice, user) {
  debugger

  let info = await mailer.sendMail({
    to: user.email,
    subject: message,
    text: message,
    html: `
      <h1>The ${parkservice.work.company.name} thanks you for using our service</h1>
      <br>
      <p>Date: ${parkservice.schedule.showFormat()}</p>
      <p>Park: ${parkservice.place.park.address}</p>
      <p>Technique: ${parkservice.place.technique.name}</p>
    `,
  }, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  });
}

module.exports =  { parkServiceCreated }
const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');

const PUBLIC_VAPID =
  'BBz64kd2ymVosCF8nbOdhCYqU4A4-AzzWbpDt_SWNMzEEz5ty-OD-kRMuQ7uEsPbHqTk3RlTmfiT8sb54ipE2OM';
const PRIVATE_VAPID = 'iEDKT26RDP2Pi_GqprrpCS2JEcQmdu1cIuLFYHvY-3g';

const app = express()

app.use(cors());
app.use(bodyParser.json());

webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID);

const fakeDatabase = []
// Routes
app.post('/subscription', (req, res) => {
    const subscription = req.body;
    fakeDatabase.push(subscription)
    
});

app.post('/sendNotification', (req, res) => {
    const notificationPayload = {
        notification: {
          title: req.body.title,
          body: req.body.body,
          icon: 'assets/icons/icon-512x512.png',
        },
      }
    
      const promises = []
      fakeDatabase.forEach(subscription => {
        promises.push(
          webpush.sendNotification(
            subscription,
            JSON.stringify(notificationPayload)
          ).then(() => console.log('successfull')).catch(() => console.log('error'))
        )
      })
      Promise.all(promises).then(() => res.sendStatus(200))
});

app.listen(3000, () => {
  console.log('Server started on port 3000')
});
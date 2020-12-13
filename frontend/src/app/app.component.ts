import { PushNotificationService } from './push-notification.service';
import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(swPush: SwPush, private pushNotificationService: PushNotificationService) {
    if (swPush.isEnabled) {
      swPush.requestSubscription({
        serverPublicKey: 'BBz64kd2ymVosCF8nbOdhCYqU4A4-AzzWbpDt_SWNMzEEz5ty-OD-kRMuQ7uEsPbHqTk3RlTmfiT8sb54ipE2OM'
      }).then(subscription => {
        // send subscription to the server
        pushNotificationService.sendSubscriptionToTheServer(subscription)
          .subscribe();
      }).catch(console.error);
    }
  }

  payload = {
    title: 'test',
    body: 'testsss'
  };

  sendNotification() {
    this.pushNotificationService.sendNotification(JSON.parse(JSON.stringify(this.payload)))
      .subscribe(() => console.log('successfull'), err => console.log('error'));
  }
}

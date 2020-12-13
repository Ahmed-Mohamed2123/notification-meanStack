import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  SERVER_URL1 = 'http://localhost:3000/subscription';
  SERVER_URL2 = 'http://localhost:3000/sendNotification';

  constructor(private http: HttpClient) { }

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(this.SERVER_URL1, subscription)
  }

  sendNotification(data: any): Observable<any> {
    return this.http.post(this.SERVER_URL2, data);
  }
}

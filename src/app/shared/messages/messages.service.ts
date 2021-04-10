import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private socket: Socket) {}
  SendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  public getMessages = () => {
    return new Observable((observer) => {
      this.socket.on('message broad', (message) => {
        console.log(message);
        observer.next(message);
      });
    });
  }
}

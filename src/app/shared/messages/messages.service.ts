import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {MessageModel} from '../../models/messages/message.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private socket: Socket, private http: HttpClient) {
  }

  createRoom(doctorId: string, patientId: string, roomName: string): void {
    this.http.post('http://localhost:3000/messages/addroom', {doctorId, patientId, roomName})
      .subscribe(result => {
        console.log(result);
      });
  }

  getRoom(userId: string, roomName: string, role: string): Observable<any> {
    return this.http.put('http://localhost:3000/messages/getChat', {userId, roomName, role});
  }


  joinRoom(data): void {
    this.socket.emit('join', data);
  }


  sendMessage(data): void {
    this.socket.emit('message', data);
  }

  SendMessage(data): void {
    this.socket.emit('message', data);
  }

  leaveRoom(data): void {
    this.socket.emit('leave', data);
  }

  public userLeftRoom = () => {
    return new Observable<{ user: string, to: string, room: string, message: string }>((observer) => {
      this.socket.on('left room', (data) => {
        console.log(data);
        observer.next(data);
      });
    });
  };

  public newMessageReceived = () => {
    return new Observable<{ user: string, to: string, room: string, message: string }>((observer) => {
      this.socket.on('new message', (data) => {
        console.log(data);
        observer.next(data);
      });
    });
  };

  public newUserJoined = () => {
    return new Observable<{ user: string, to: string, room: string, message: string }>((observer) => {
      this.socket.on('new user joined', (data) => {
        console.log(data);
        observer.next(data);
      });
    });
  };
}

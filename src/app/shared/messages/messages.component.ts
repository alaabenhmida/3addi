import { Component, OnInit } from '@angular/core';
import {MessagesService} from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  message: string;
  messages: string[] = [];

  constructor(private chatService: MessagesService) { }

  ngOnInit(): void {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }

  SendMessage(): void {
    this.chatService.SendMessage(this.message);
    this.message = '';
  }
}

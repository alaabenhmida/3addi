import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagesService} from './messages.service';
import {Subscription} from 'rxjs';
import {PatientAuthService} from '../../auth/Patient/patient-auth.service';
import {PatientServiceService} from '../../services/Patient/patient-service.service';
import {DoctorServiceService} from '../../services/doctor/doctor-service.service';
import {Doctor} from '../../models/Doctor/doctor.model';
import {Patient} from '../../models/Patient/patient.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  user: string;
  message: string;
  messageArray: Array<{user: string, to: string, room: string, message: string}> = [];
  newUserJoinedSub: Subscription;
  newMessageReceivedSub: Subscription;
  userLeftRoomSub: Subscription;
  room = 'alaRoom';
  private role: string;
  private userid: string;
  private roleSubs: Subscription;
  private useridSub: Subscription;
  doctorData: Doctor;
  patientdata: Patient;
  chatRooms: any;
  to: string;
  withData: any;

  constructor(private chatService: MessagesService, private authService: PatientAuthService,
              private patientService: PatientServiceService, private doctorService: DoctorServiceService) { }

  ngOnInit(): void {
    // autoAuthUser

    this.role = this.authService.getRole();
    this.roleSubs = this.authService.getRoleListener().subscribe(role => {
      this.role = role;
    });
    this.userid = this.authService.getUserid();
    this.useridSub = this.authService.getuseridListener().subscribe(
      isAuthenticated => {
        this.userid = isAuthenticated;
      }
    );
    console.log(this.role);

    if (this.role === 'doctor'){
      this.doctorService.getDcotorByKey().subscribe(data => {
        this.doctorData = {
          id: data._id,
          email: data.email,
          password: data.password,
          imagePath: data.imagePath,
          name: data.name,
          lastName: data.lastName,
          gender: data.gender,
          address: data.address,
          speciality: data.speciality,
          post: data.post,
          birthday: data.birthday,
          price: data.price,
          phone: data.phone,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          country: data.country,
          zip: data.zip,
          reviews: data.reviews,
          rdv: data.rdv
        };
        this.chatService.joinRoom({user: data._id, room: data.chatRoom[0].name});
        this.chatService.getRoom(data._id, data.chatRoom[0].name, this.role).subscribe(res => {
          this.messageArray = res.chatRoom[0].messages;
          this.withData = res.chatRoom[0].with;
        });
        this.chatRooms = data.chatRoom;
      });
    } else {
      this.patientService.getPatientByKey().subscribe(data => {
        this.patientdata = {
          id : data._id,
          email : data.email,
          password : data.password,
          imagePath : data.imagePath,
          name : data.name,
          lastName: data.lastName,
          address : data.address,
          birthday : data.birthday,
          bloodType : data.bloodType,
          phone : data.phone,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
          rdv : data.rdv
        };
        this.chatRooms = data.chatRoom;
        this.chatService.joinRoom({user: data._id, room: data.chatRoom[0].name});
        this.chatService.getRoom(data._id, data.chatRoom[0].name, this.role).subscribe(res => {
          this.messageArray = res.chatRoom[0].messages;
          this.withData = res.chatRoom[0].with;
        });
      });
    }


    this.newUserJoinedSub = this.chatService.newUserJoined().subscribe(data => {
      this.messageArray.push();
    });
    this.newMessageReceivedSub = this.chatService.newMessageReceived()
      .subscribe(data => {
        this.messageArray.push(data);
      });
    this.userLeftRoomSub = this.chatService.userLeftRoom()
      .subscribe(data => {
        this.messageArray.push(data);
      });
  }

  join(): void {
    this.chatService.joinRoom({user: this.userid, room: this.chatRooms[0].name});
  }

  sendMessage(): void {
    this.chatService.sendMessage({user: this.userid, to: this.to, room: this.room, message: this.message});
    this.message = '';
  }

  leave(): void {
    this.chatService.leaveRoom({user: 'ala', room: this.room});
  }

  switchRoom(roomName: string, to: string): void {
    this.room = roomName;
    this.to = to;
    this.chatService.joinRoom({user: 'ala', room: this.room});
    this.chatService.getRoom(this.userid, roomName, this.role).subscribe(res => {
      this.messageArray = res.chatRoom[0].messages;
      this.withData = res.chatRoom[0].with;
    });
  }

  ngOnDestroy(): void {
    this.newUserJoinedSub.unsubscribe();
    this.newMessageReceivedSub.unsubscribe();
    this.userLeftRoomSub.unsubscribe();
    this.roleSubs.unsubscribe();
    this.useridSub.unsubscribe();
    this.leave();
  }

}

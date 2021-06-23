import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-manage-time',
  templateUrl: './manage-time.component.html',
  styleUrls: ['./manage-time.component.css']
})
export class ManageTimeComponent implements OnInit {
  form: FormGroup;
  tab = [];
  breackTimes = [];
  doctorData: Doctor;
  workingTimes = [];
  from: string;
  to: string;
  duration: number;

  constructor(private doctorService: DoctorServiceService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      duration: new FormControl(null, {validators: [Validators.required]}),
      from: new FormControl(null, {validators: [Validators.required]}),
      to: new FormControl(null, {validators: [Validators.required]})
    });

    this.doctorService.getDcotorByKey().subscribe(doctor => {
      this.doctorData = doctor;
      this.breackTimes = doctor.workingTime.breackTimes;
      this.from = doctor.workingTime.from;
      this.to = doctor.workingTime.to;
      this.duration = doctor.workingTime.duration;
      this.form.patchValue({
        duration: doctor.workingTime.duration,
        from: doctor.workingTime.from,
        to: doctor.workingTime.to
      });
      this.tab = this.getSlots(doctor.workingTime.duration, doctor.workingTime.breackTimes, doctor.workingTime.from, doctor.workingTime.to);
    });
  }

  isInbreack(slotTime, breackTimes): string {
    return breackTimes.some((br) => {
      return slotTime >= moment(br[0], 'HH:mm') && slotTime < moment(br[1], 'HH:mm');
    });
  }

  getSlots(nextSlot, breackTimes, startTime, endTimee): string[] {
    const times = [];

    let slotTime = moment(startTime, 'HH:mm');
    const endTime = moment(endTimee, 'HH:mm');
    while (slotTime < endTime) {
      if (!this.isInbreack(slotTime, breackTimes)) {
        times.push(slotTime.format('HH:mm'));
      }
      slotTime = slotTime.add(nextSlot, 'minutes');
    }
    return (times);
  }

  addTime(time): string {
    if (time) {
      return (moment(time, 'HH:mm').add(this.form.value.duration, 'minutes')).format('HH:mm');
    }
    return '';
  }

  onDelete(i): void {
    const finish = (moment(this.tab[i], 'HH:mm').add(this.form.value.duration, 'minutes'))
      .format('HH:mm');
    this.breackTimes.push([this.tab[i], finish]);
    this.tab.splice(i, 1);

  }

  onGenere(): void {
    if (!this.form.invalid) {
      this.duration = this.form.value.duration;
      this.from = this.form.value.from;
      this.to = this.form.value.to;
      this.tab = this.getSlots(this.form.value.duration, [], this.form.value.from, this.form.value.to);
      this.breackTimes = [];
    }
  }

  onSubmit(): void {
    if (!this.form.invalid) {
      this.doctorService.workingTime(this.form.value.duration, this.form.value.from, this.form.value.to, this.breackTimes)
        .subscribe(result => {
          this.toastr.success('modifications enregistrés', '', {
            positionClass: 'toast-bottom-right'
          });
        }, error => {
          console.log(error);
        });
    }
  }
}

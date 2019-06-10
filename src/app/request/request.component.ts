import { LocalstorageService } from './../services/localstorage.service';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Course, CCourse } from '../models/course.interface';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit, OnDestroy {
  form: FormGroup;

  secondName = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  middleName = new FormControl('', Validators.required);

  phoneNumber = new FormControl(null, [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('^[0-9]*$')
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);

  additionalInfo = new FormControl('');
  courseId = new FormControl('', Validators.required);
  courseName = new FormControl('', Validators.required);

  requestedCourse$: Observable<Course>;

  status = {
    sending: false,
    sent: false,
    errored: false,
    error: ''
  };

  formSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<RequestComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { courseId: string; courseName: string },
    private fb: FormBuilder,
    private courses: CoursesService,
    private requests: RequestsService,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit() {
    this.requestedCourse$ = this.courses.findById(this.data.courseId);

    this.form = this.fb.group({
      secondName: this.secondName,
      firstName: this.firstName,
      middleName: this.middleName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      additionalInfo: this.additionalInfo,
      courseId: this.data.courseId,
      courseName: this.data.courseName
    });

    if (this.localStorage.get('requestForm')) {
      this.form.patchValue(this.localStorage.get('requestForm'));
    }

    this.formSub = this.form.valueChanges.subscribe(value => {
      if (this.form.valid) {
        this.localStorage.set('requestForm', value);
      }
    });
  }

  ngOnDestroy() {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }

  getCourseTypeName(type: string): string {
    return CCourse.getTypeName(type);
  }

  async onSubmit() {
    console.log(this.form.value);
    try {
      this.status.sending = true;
      await this.requests.create(this.form.value);
      this.status.sent = true;
      this.status.sending = false;
    } catch (error) {
      this.status.error = error;
      console.error(error);
    }
  }
}

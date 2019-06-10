import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Course, CCourse } from 'src/app/models/course.interface';
import { RequestComponent } from 'src/app/request/request.component';
import { Overlay } from '@angular/cdk/overlay';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-25px)' }),
        animate(
          '200ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;
  @Input() canEdit: boolean;
  @Input() canCreate: boolean;
  @Input() fake: boolean;

  @Input() compact: boolean;

  private _create: boolean;
  @Input() set create(value: boolean) {
    this._create = value;
  }

  get create(): boolean {
    return this._create;
  }

  private _edit: boolean;
  @Input() set edit(value: boolean) {
    this._edit = value;
    if (value === true) {
      this.fillEditForm();
    }
  }

  get edit(): boolean {
    return this._edit;
  }

  // for uploading
  imgUrl = new FormControl('');
  imgPath = new FormControl('');

  logoUrl = new FormControl('');
  logoPath = new FormControl('');

  form: FormGroup;
  name = new FormControl('', Validators.required);
  hours = new FormControl(0, [Validators.required, Validators.min(1)]);
  requiredEducation = new FormControl('');
  free = new FormControl(false);
  cost = new FormControl(null);
  costInfo = new FormControl('');
  type = new FormControl('', Validators.required);
  description = new FormControl('');

  @ViewChild('costInfo', { static: true }) costInfoTemplate: TemplateRef<any>;
  @ViewChild('fullInfo', { static: true }) fullInfoTemplate: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    private fb: FormBuilder,
    private courses: CoursesService
  ) {
    this.form = this.fb.group({
      name: this.name,
      hours: this.hours,
      requiredEducation: this.requiredEducation,
      free: this.free,
      cost: this.cost,
      costInfo: this.costInfo,
      type: this.type,
      description: this.description,
      img: this.fb.group({
        url: this.imgUrl,
        path: this.imgPath,
      }),
      logo: this.fb.group({
        url: this.logoUrl,
        path: this.logoPath,
      }),
    });
  }

  ngOnInit() {}

  getCourseTypeName(type: string): string {
    return CCourse.getTypeName(type);
  }

  fillEditForm() {
    if (this.edit) {
      if (!this.course) {
        console.error('Must provide course object');
        return;
      }
      this.form.patchValue(this.course);
      console.log(this.form.value);
    }
  }

  /* Dialogs */

  openFullInfo() {
    const dialogRef = this.dialog.open(this.fullInfoTemplate, {
      width: '500px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      autoFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The cost info dialog was closed');
    });
  }

  openCostInfo() {
    const dialogRef = this.dialog.open(this.costInfoTemplate, {
      width: '400px',
      maxWidth: '90vw',
      maxHeight: '60vh',
      autoFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The cost info dialog was closed');
    });
  }

  openRequestDialog(): void {
    const dialogRef = this.dialog.open(RequestComponent, {
      width: '450px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      data: { courseId: this.course.uid, courseName: this.course.name },
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The request dialog was closed');
    });
  }

  onCreate() {
    console.log(this.form.value);
    this.courses.create(this.form.value).then(() => {
      console.log('course created');
      this.form.reset();
    });
  }

  onEdit() {
    console.log(this.form.value);
    this.courses.update(this.course.uid, this.form.value).then(() => {
      console.log('course updated');
      this.edit = false;
    });
  }

  onEditImageDone($event: { url: string; path: string }) {
    console.log('onEditImageDone');
    this.imgUrl.patchValue($event.url);
    this.imgPath.patchValue($event.path);
    this.courses
      .updateImage(this.course.uid, $event)
      .then(() => console.log('image of course updated'));
  }

  onEditImageDelete() {
    console.log('onEditImageDelete');

    this.courses
      .deleteImage(this.course.uid, this.course.img.path)
      .then(() => console.log('image of course deleted'));
    this.imgPath.reset();
    this.imgUrl.reset();
  }

  onEditLogoDone($event: { url: string; path: string }) {
    console.log('onEditLogoDone');
    this.logoUrl.patchValue($event.url);
    this.logoPath.patchValue($event.path);
    this.courses
      .updateLogo(this.course.uid, $event)
      .then(() => console.log('logo of course updated'));
  }

  onEditLogoDelete() {
    console.log('onEditLogoDelete');

    this.courses
      .deleteLogo(this.course.uid, this.course.logo.path)
      .then(() => console.log('logo of course deleted'));
    this.logoPath.reset();
    this.logoUrl.reset();
  }

  onUploadImageDone($event: { url: string; path: string }) {
    const img = $event;
    this.imgUrl.setValue(img.url);
    this.imgPath.setValue(img.path);
    console.log($event);
  }

  onUploadImageDelete() {
    this.imgUrl.reset();
    this.imgPath.reset();
  }

  onUploadLogoDone($event: { url: string; path: string }) {
    const logo = $event;
    this.logoUrl.setValue(logo.url);
    this.logoPath.setValue(logo.path);
    console.log($event);
  }

  onUploadLogoDelete() {
    this.logoUrl.reset();
    this.logoPath.reset();
  }

  onCourseDelete() {
    this.courses.delete(this.course.uid);
  }
}

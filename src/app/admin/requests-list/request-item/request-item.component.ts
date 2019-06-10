import { Course, CCourse } from 'src/app/models/course.interface';
import { CoursesService } from './../../../services/courses.service';
import { UserRequest } from './../../../models/user-request.interface';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestItemComponent implements OnInit {
  @Input() request: UserRequest;

  course$: Observable<Course>;

  @ViewChild('noteDialog', { static: true }) noteDialogTemplate: TemplateRef<
    any
  >;

  noteDialogData: any;

  constructor(
    private coursesService: CoursesService,
    private requestsService: RequestsService,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  ngOnInit() {
    this.course$ = this.coursesService.findById(this.request.courseId);
  }

  setDone(bool: boolean): Promise<any> {
    return this.requestsService.update(this.request.uid, { done: bool });
  }

  onDelete() {
    return this.requestsService.delete(this.request.uid);
  }

  openNoteDialog(): void {
    this.noteDialogData = {
      name: `${this.request.secondName} ${this.request.firstName} ${
        this.request.middleName
      }`,
      date: this.request.createDate,
      note: this.request.note || null,
    };

    const dialogRef = this.dialog.open(this.noteDialogTemplate, {
      width: '500px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      autoFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });

    dialogRef.afterClosed().subscribe(note => {
      console.log('The request note dialog was closed');
      if (note) {
        return this.requestsService.update(this.request.uid, { note });
      }
    });
  }

  deleteNote() {
    return this.requestsService.update(this.request.uid, {
      note: firestore.FieldValue.delete() as any,
    });
  }

  getCourseTypeName(type: string): string {
    return CCourse.getTypeName(type);
  }
}

import { CoursesService } from 'src/app/services/courses.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { Observable } from 'rxjs';
import { UserRequest } from 'src/app/models/user-request.interface';
import { map } from 'rxjs/operators';
import { Course } from 'src/app/models/course.interface';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  animateChild,
} from '@angular/animations';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), // initial
        animate('500ms ease', style({ transform: 'scale(1)', opacity: 1 })), // final
      ]),
    ]),
    trigger('list', [
      transition(':enter', [
        query('@items', stagger(200, animateChild()), { optional: true }),
      ]),
    ]),
  ],
})
export class RequestsListComponent implements OnInit {
  listAll$: Observable<UserRequest[]>;

  listNew$: Observable<UserRequest[]>;
  listDone$: Observable<UserRequest[]>;

  constructor(
    private requestsService: RequestsService,
    public coursesService: CoursesService
  ) {
    this.listAll$ = this.requestsService.findAll();

    this.listNew$ = this.listAll$.pipe(
      map(requests => {
        return requests.filter(req => req.done !== true);
      })
    );

    this.listDone$ = this.listAll$.pipe(
      map(requests => {
        return requests.filter(req => req.done === true);
      })
    );
  }

  ngOnInit() {}

  getCourse(id: string): Observable<Course> {
    return this.coursesService.findById(id);
  }

  trackByFn(index: number, item: UserRequest) {
    return item.uid;
  }
}

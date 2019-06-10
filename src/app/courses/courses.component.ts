import { CoursesService } from './../services/courses.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../models/course.interface';
import { AuthService } from '../services/auth.service';
import {
  moveItemInArray,
  CdkDropListGroup,
  CdkDropList,
  CdkDragMove,
  CdkDrag,
} from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses$: Observable<Course[]>;
  coursesSub: Subscription;
  list: Course[] = [];

  isAdmin$: Observable<boolean>;

  create: boolean;

  fakeList = new Array(10);

  draggingEnabled = false;
  editingEnabled = true;

  @ViewChild(CdkDropListGroup, { static: false }) listGroup: CdkDropListGroup<
    CdkDropList
  >;
  @ViewChild(CdkDropList, { static: false }) placeholder: CdkDropList;

  isDragging: boolean;

  // public items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  target: CdkDropList;
  targetIndex: number;
  source: CdkDropList;
  sourceIndex: number;
  dragIndex: number;
  activeContainer;

  fixSourceIndex = 1;
  fixTargetIndex = 1;

  filterType = 'all';

  constructor(
    private coursesService: CoursesService,
    private auth: AuthService,
    private ref: ChangeDetectorRef,
    private viewportRuler: ViewportRuler
  ) {
    this.target = null;
    this.source = null;
  }

  ngOnInit() {
    this.isAdmin$ = this.auth.isAdmin$;
    this.courses$ = this.coursesService.findAll();
    this.coursesSub = this.courses$.subscribe(courses => {
      this.list = courses;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.coursesSub) {
      this.coursesSub.unsubscribe();
    }
  }

  trackByFn(index: number, item: Course) {
    return item.uid;
  }

  dragStarted() {
    this.isDragging = true;
  }

  dragReleased() {
    this.isDragging = false;
  }

  dragMoved(e: CdkDragMove) {
    const point = this.getPointerPositionOnPage(e.event);

    this.listGroup._items.forEach(dropList => {
      if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
        this.activeContainer = dropList;
        return;
      }
    });
  }

  dropListDropped(event) {
    if (!this.target) {
      return;
    }

    const phElement = this.placeholder.element.nativeElement;
    const parent = phElement.parentElement;

    phElement.style.display = 'none';

    parent.removeChild(phElement);
    parent.appendChild(phElement);
    parent.insertBefore(
      this.source.element.nativeElement,
      parent.children[this.sourceIndex]
    );

    this.target = null;
    this.source = null;

    if (this.sourceIndex !== this.targetIndex) {
      // TODO: this is dumb fix
      if (this.fixSourceIndex === 1 && this.fixTargetIndex === 1) {
        moveItemInArray(this.list, this.sourceIndex - 1, this.targetIndex - 1);
        this.fixSourceIndex = null;
        this.fixTargetIndex = null;
      } else {
        moveItemInArray(this.list, this.sourceIndex, this.targetIndex);
      }

      const updates: Promise<any>[] = [];

      for (let i = 0; i < this.list.length; i++) {
        this.list[i].sort = i;
        updates.push(
          this.coursesService.update(this.list[i].uid, {
            sort: this.list[i].sort,
          })
        );
      }

      Promise.all(updates).then(() => {
        // this.saved = true;
        this.ref.markForCheck();
      });
    }
  }

  dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    this.ref.markForCheck();
    if (drop === this.placeholder) {
      return true;
    }

    if (drop !== this.activeContainer) {
      return false;
    }

    const phElement = this.placeholder.element.nativeElement;
    const sourceElement = drag.dropContainer.element.nativeElement;
    const dropElement = drop.element.nativeElement;

    const dragIndex = __indexOf(
      dropElement.parentElement.children,
      this.source ? phElement : sourceElement
    );
    const dropIndex = __indexOf(
      dropElement.parentElement.children,
      dropElement
    );

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      phElement.style.width = sourceElement.clientWidth + 'px';
      phElement.style.height = sourceElement.clientHeight + 'px';

      sourceElement.parentElement.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    phElement.style.display = '';
    dropElement.parentElement.insertBefore(
      phElement,
      dropIndex > dragIndex ? dropElement.nextSibling : dropElement
    );

    this.placeholder.enter(
      drag,
      drag.element.nativeElement.offsetLeft,
      drag.element.nativeElement.offsetTop
    );
    return false;
  };

  /** Determines the point of the page that was touched by the user. */
  getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
    // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
    const point = __isTouchEvent(event)
      ? event.touches[0] || event.changedTouches[0]
      : event;
    const scrollPosition = this.viewportRuler.getViewportScrollPosition();

    return {
      x: point.pageX - scrollPosition.left,
      y: point.pageY - scrollPosition.top,
    };
  }
}

function __indexOf(collection, node) {
  return Array.prototype.indexOf.call(collection, node);
}

/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type.startsWith('touch');
}

function __isInsideDropListClientRect(
  dropList: CdkDropList,
  x: number,
  y: number
) {
  const {
    top,
    bottom,
    left,
    right,
  } = dropList.element.nativeElement.getBoundingClientRect();
  return y >= top && y <= bottom && x >= left && x <= right;
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseTypeFilter',
  pure: false,
})
export class CourseTypeFilterPipe implements PipeTransform {
  transform(items: Course[], type: string): any {
    if (!items || !type) {
      return items;
    }

    if (type === 'all') {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.type === type);
  }
}

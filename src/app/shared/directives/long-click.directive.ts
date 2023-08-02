import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { map, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tapFirst } from '@shared/utils/custom-rxjs-operators';

@UntilDestroy()
@Directive({
  selector: '[appLongClick]',
})
export class LongClickDirective implements OnInit {
  @Input() clickDelay: number = 500;
  @Input() clickRepeatPeriod: number = 100;

  @Output() longClick = new EventEmitter<{
    event: Event;
    tick: number;
  }>();
  @Output() longClickEnd = new EventEmitter<Event>();

  // if needed to distinguish between long and fast click
  @Output() fastClick = new EventEmitter<Event>();
  // if needed to share the same handler for long and fast click
  // cannot be replaced with mouseup event since fast click is after mouseup
  @Output() fastClickEnd = new EventEmitter<Event>();

  private readonly _stop = new Subject<Event>();
  private readonly _start = new Subject<Event>();
  private readonly _longStart = new Subject<Event>();

  ngOnInit() {
    this._start
      .pipe(
        switchMap(startEvent => {
          return timer(this.clickDelay, this.clickRepeatPeriod).pipe(
            map(tick => ({
              event: startEvent,
              tick,
            })),
            tapFirst(({ event }) => {
              this._longStart.next(event);
            }),
            takeUntil(
              this._stop.pipe(
                tap(stopEvent => {
                  return this.longClickEnd.emit(stopEvent);
                })
              )
            )
          );
        }),
        untilDestroyed(this)
      )
      .subscribe(tickEvent => {
        this.longClick.emit(tickEvent);
      });
    this._start
      .pipe(
        switchMap(
          (
            startEvent // listen to stop event
          ) =>
            this._stop.pipe(
              // fast click is a click that is not long
              takeUntil(this._longStart)
            )
        ),
        untilDestroyed(this)
      )
      .subscribe(event => {
        this.fastClick.emit(event);
        this.fastClickEnd.emit(event);
      });
  }

  @HostListener('mousedown', ['$event']) onClickStart(event: MouseEvent) {
    this._start.next(event);
  }

  @HostListener('mouseup', ['$event']) onClickEnd(event: MouseEvent) {
    this._stop.next(event);
  }

  @HostListener('mouseleave', ['$event']) onClickLeave(event: MouseEvent) {
    this._stop.next(event);
  }
}

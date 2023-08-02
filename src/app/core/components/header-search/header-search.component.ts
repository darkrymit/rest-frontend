import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, filter, map, Observable, switchMap } from 'rxjs';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { GiftCertificateService } from '@app/data/api/services/gift-certificate.service';
import { GiftCertificate } from '@app/data/api/models/gift-certificate.model';
import { PageRequest } from '@app/data/api/models/pagination/page-request.model';
import { Page } from '@app/data/api/models/pagination/page.model';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent implements OnInit {
  form!: FormGroup;

  pageRequest: PageRequest = {
    page: 0,
    size: 5,
    sort: [{ property: 'name', direction: 'ASC' }],
  };

  previewCertificates: GiftCertificate[] = [];

  searchFocus = false;

  @Output() focusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: GiftCertificateService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(''),
    });

    this.router.events
      .pipe(
        filter(
          (event: Event) =>
            event instanceof NavigationEnd || event instanceof NavigationStart
        )
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.searchFocus = false;
          this.focusChanged.emit(this.searchFocus);
          this.form.disable();
          this.form.enable();
        }
        if (event instanceof NavigationEnd) {
          this.form.reset();
          this.form
            .get('search')
            ?.setValue(this.route.snapshot.queryParamMap.get('search') || '');
        }
      });

    this.form
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(500),
        switchMap((value: string) => {
          return this.getPreviewCertificates(value);
        })
      )
      .subscribe(value => {
        this.previewCertificates = value;
      });
  }

  onSubmit() {
    this.router.navigate(['/search'], {
      queryParams: { search: this.form.value.search },
      onSameUrlNavigation: 'reload',
    });
  }

  getPreviewCertificates(search?: string): Observable<GiftCertificate[]> {
    if (!search) {
      return new Observable<GiftCertificate[]>(subscriber => {
        subscriber.next([]);
        subscriber.complete();
        subscriber.unsubscribe();
      });
    }
    return this.service.getAll(this.pageRequest, { part: search }).pipe(
      map((data: Page<GiftCertificate>) => {
        return data.content;
      })
    );
  }

  onFocusIn() {
    this.searchFocus = true;
    this.focusChanged.emit(this.searchFocus);
  }

  @HostListener('document:mousedown', ['$event']) onGlobalClick(
    event: MouseEvent
  ): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.searchFocus = false;
      this.focusChanged.emit(this.searchFocus);
    }
  }
}

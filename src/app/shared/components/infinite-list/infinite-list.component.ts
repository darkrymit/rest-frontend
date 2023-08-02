import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { InfiniteListItemDirective } from './infinite-list-item.directive';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss'],
})
export class InfiniteListComponent {
  @Input()
  scrollContainerSelector!: string;

  @Input()
  data: any[] = [];

  @Input()
  gridTemplateColumns = '1fr';

  @Input()
  last = false;

  @Input()
  loading = true;

  @Output()
  requireNextData = new EventEmitter<void>();

  @ContentChild(InfiniteListItemDirective)
  item!: InfiniteListItemDirective;

  onScrolled() {
    if (this.last || this.loading) {
      return;
    }
    this.requireNextData.emit();
  }
}

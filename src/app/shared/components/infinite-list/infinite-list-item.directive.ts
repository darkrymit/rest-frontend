import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appInfiniteListItem]',
})
export class InfiniteListItemDirective {
  constructor(public readonly template: TemplateRef<any>) {}
}

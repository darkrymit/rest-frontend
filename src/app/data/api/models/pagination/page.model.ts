import { Resource } from '../hateos/resource.model';
import { Link } from '../hateos/link.model';

export interface PageMetadata {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export class Page<T> extends Resource {
  content: T[];
  metadata: PageMetadata;

  constructor(content: T[], metadata: PageMetadata, links: Link[]) {
    super(links);
    this.content = content;
    this.metadata = metadata;
  }

  getSize(): number {
    return this.metadata.size;
  }

  getTotalElements(): number {
    return this.metadata.totalElements;
  }

  getTotalPages(): number {
    return this.metadata.totalPages;
  }

  getNumber(): number {
    return this.metadata.number;
  }

  isLast(): boolean {
    return !this.isRelPresent('next');
  }

  isFirst(): boolean {
    return !this.isRelPresent('prev');
  }
}

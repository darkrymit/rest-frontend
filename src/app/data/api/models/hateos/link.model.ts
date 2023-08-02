export class Link {
  rel: string;
  href: URL;

  constructor(rel: string, href: URL) {
    this.rel = rel;
    this.href = href;
  }

  public static of(rel: string, href: URL | string): Link {
    if (typeof href === 'string') {
      href = new URL(href);
    }
    return new Link(rel, href);
  }
}

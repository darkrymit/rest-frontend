import { Resource } from './hateos/resource.model';
import { Link } from './hateos/link.model';

export class User extends Resource {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  creationDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    creationDate: Date,
    lastModifiedBy: string,
    lastModifiedDate: Date,
    links: Link[]
  ) {
    super(links);
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.creationDate = creationDate;
    this.lastModifiedBy = lastModifiedBy;
    this.lastModifiedDate = lastModifiedDate;
  }
}

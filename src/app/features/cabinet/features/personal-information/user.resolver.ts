import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@app/data/api/services/user.service';
import { User } from '@app/data/api/models/user.model';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService) {}

  resolve(): Observable<User> {
    return this.userService.getMe();
  }
}

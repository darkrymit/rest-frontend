import { Component } from '@angular/core';
import { User } from '@app/data/api/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent {
  user!: User;

  constructor(private activatedRoute: ActivatedRoute) {
    this.user = this.activatedRoute.snapshot.data['user'];
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  orderState!: {
    id: number;
    totalPrice: number;
  };

  constructor(private router: Router) {
    let state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.orderState = state['orderState'];
    }
  }

  ngOnInit(): void {
    if (!this.orderState) {
      this.router.navigate(['/']);
    }
  }
}

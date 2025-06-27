import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router'; // Import Router to navigate
import { TypePayments } from '../../../../models/TypePayments';
import { TypePaymentsService } from '../../../../services/type-payments.service';
import { CommonModule } from '@angular/common';
 // Adjust path as needed

@Component({
  selector: 'app-listartickets',
  templateUrl: './listartickets.html',
  styleUrls: ['./listartickets.css'],
  imports: [CommonModule,RouterModule],
})
export class Listartickets implements OnInit {
  availablePayments: TypePayments[] = [];  // Array to hold available payment types
  selectedPayment: TypePayments | null = null;  // Store the selected payment method

  constructor(
    private router: Router,  // Inject Router for navigation
    private typePaymentsService: TypePaymentsService  // Inject TypePaymentsService to fetch payment methods
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.typePaymentsService.list().subscribe((payments: TypePayments[]) => {
      this.availablePayments = payments;
    });
  }

  onSelectPayment(payment: TypePayments) {
  this.selectedPayment = payment;
  // Assuming 'payment.id' exists, use it to navigate
  this.router.navigate([`/tickets/ediciones/${payment.id}`], { queryParams: { payment: JSON.stringify(payment) } });
}



}

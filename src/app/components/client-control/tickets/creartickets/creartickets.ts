import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';  
import { Ticket } from '../../../../models/Ticket';
import { TypePayments } from '../../../../models/TypePayments';  
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creartickets',
  templateUrl: './creartickets.html',
  styleUrls: ['./creartickets.css'],
  standalone: true,  // This makes the component standalone
  imports: [CommonModule, FormsModule, RouterModule],  // Import necessary modules
})
export class Creartickets implements OnInit {
  ticket: Ticket = new Ticket();
  paymentSelect: TypePayments | null = null;
  ticketDetails: any = {
    movie: 'Cineplanet',
    time: '7:50 p.m.',
    room: '04',
    seats: 'G3 - G4',
    cart: [
      { item: 'Entrada estándar', quantity: 2, price: 40.00 },
      { item: 'Membresía CinemahubPlus+', quantity: 1, price: 20.00 }
    ]
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const paymentData = params['payment'] ? JSON.parse(params['payment']) : null;
      if (paymentData) {
        this.paymentSelect = paymentData;
      }
    });
  }

  generateBoleta(ticketId: number) {
    console.log('Ticket PDF generated for ticket ID:', ticketId);
  }

  goBackToHome() {
    this.router.navigate(['/landinghome']);
  }
}

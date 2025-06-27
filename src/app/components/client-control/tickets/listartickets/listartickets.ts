import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service';
import { Ticket } from '../../../../models/Ticket';
import { App } from '../../../../app';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

@Component({
  selector: 'app-listartickets',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './listartickets.html',
  styleUrls: ['./listartickets.css']
})
export class ListarTickets implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'totalpay',
    'fechapago',
    'paymentmethod',
    'pelicula',
    'cine',
    'usuario',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private app: App
  ) {}

  ngOnInit(): void {
    // Asegúrate de que la respuesta de la API se esté recibiendo correctamente
    this.ticketService.list().subscribe((data) => {
      console.log(data); // Verifica los datos recibidos
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.error('Error al obtener los tickets', error);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number): void {
    this.ticketService.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(ticket => ticket.id !== id);
    });
  }

  editar(id: number): void {
    this.router.navigate(['tickets/editar', id]);
  }

  isADMIN(): boolean {
    return this.app.isAdmin();
  }

  isCLIENTE(): boolean {
    return this.app.isCliente();
  }

  // Generar PDF para un ticket
  exportToPDF(ticket: Ticket): void {
    const doc = new jsPDF();
    const qrCode = QRCode.toDataURL(ticket.id.toString());  // Genera un QR con el ID del ticket

    qrCode.then(url => {
      doc.setFontSize(16);
      doc.text(`Ticket ID: ${ticket.id}`, 20, 20);
      doc.text(`Total Pago: ${ticket.totalpay}`, 20, 30);
      doc.text(`Fecha de Pago: ${ticket.fechapago}`, 20, 40);
      doc.text(`Método de Pago: ${ticket.typepayments_id.paymentname}`, 20, 50);
      doc.text(`Película: ${ticket.functions_id.moviecinema_id.movies_id.namemovie}`, 20, 60);
      doc.text(`Cine: ${ticket.functions_id.moviecinema_id.cinemarooms_id.cinema.localname}`, 20, 70);
      doc.text(`Usuario: ${ticket.functions_id.user_id.username}`, 20, 80);

      // Insertar el QR
      doc.addImage(url, 'PNG', 150, 20, 40, 40);  // Añade el QR en el documento

      // Descargar el PDF
      doc.save(`ticket_${ticket.id}.pdf`);
    });
  }
}

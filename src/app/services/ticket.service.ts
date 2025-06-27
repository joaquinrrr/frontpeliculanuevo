import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { Subject } from 'rxjs';
import { Ticket } from '../models/Ticket';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private url = `${base_url}/ticket`;
  private urlinsert = `${base_url}/ticket/Registro`;
  private listaCambio = new Subject<Ticket[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Ticket[]>(this.url);
  }

  insert(r: Ticket) {
    return this.http.post(this.urlinsert, r);
  }

  setList(listaNueva: Ticket[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Ticket>(`${this.url}/${id}`);
  }

  update(r: Ticket, id: number) {
    return this.http.put(`${this.url}/${id}`, r);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Method to call backend and download the PDF ticket
  generateTicketPDF(id: number) {
    return this.http.get(`${this.url}/${id}/boleta`, { responseType: 'blob' }).subscribe(
      (response: any) => {
        // Use FileSaver to download the PDF
        saveAs(response, `boleta_${id}.pdf`);
      },
      (error) => {
        console.error('Error generating PDF ticket:', error);
      }
    );
  }
}
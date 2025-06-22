import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CinemaRooms } from '../../../../models/CinemaRooms';
import { App } from '../../../../app';
import { CinemaRoomsService } from '../../../../services/cinema-rooms.service';

@Component({
  selector: 'app-listarcinemarooms',
  imports: [
    MatTableModule,
    MatCardModule,
    CommonModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './listarcinemarooms.html',
  styleUrl: './listarcinemarooms.css',
  standalone: true
})
export class Listarcinemarooms implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<CinemaRooms> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sI: CinemaRoomsService, private aPP: App) {}

  ngOnInit(): void {
    this.sI.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(this.sortById(data));
    });
    this.sI.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(this.sortById(data));
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sI.eliminar(id).subscribe(() => {
      this.sI.list().subscribe((data) => {
        this.sI.setList(this.sortById(data));
      });
    });
  }

  sortById(data: CinemaRooms[]): CinemaRooms[] {
    return data.sort((a, b) => a.id - b.id);
  }

  isADMIN(): boolean {
    return this.aPP.isAdmin();
  }

  isCLIENT(): boolean {
    return this.aPP.isCliente();
  }
}

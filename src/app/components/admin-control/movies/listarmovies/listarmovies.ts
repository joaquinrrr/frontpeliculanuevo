import { Movies } from '../../../../models/Movies';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MoviesService } from '../../../../services/movies.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { App } from '../../../../app';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarmovies',
  imports: [MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    RouterModule],
  templateUrl: './listarmovies.html',
  styleUrl: './listarmovies.css'
})
export class Listarmovies implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource <Movies> = new MatTableDataSource();
displayedColumns: string[] = [
  'id', 'namemovie', 'yearmovie', 'typemovie',
  'yearold', 'director', 'urlimage', 'acciones' // ← esto debe estar incluido
];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private mov: MoviesService,
    private aPP: App,
    private router: Router  // ← solución aquí
  ) {}

  ngOnInit(): void {
    // Carga inicial de productos
    this.mov.list().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    // Actualización reactiva de la lista de productos
    this.mov.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number): void {
    this.mov.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((product) => product.id !== id);
    });
  }

  editar(id: number): void {
    this.router.navigate(['movies/ediciones', id]);  
  }

  isADMIN(): boolean {
    return this.aPP.isAdmin();
  }
  isCLIENTE(): boolean {
    return this.aPP.isCliente();
  }
  
}
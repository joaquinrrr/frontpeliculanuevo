import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { App } from '../../../../app';
import { FunctionService } from '../../../../services/functions.service';
import { Function } from '../../../../models/Functions';

@Component({
  selector: 'app-listarfunciones',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './listarfunciones.html',
  styleUrl: './listarfunciones.css'
})
export class Listarfunciones implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Function> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'totalchair',
    'pelicula',
    'cine',
    'sala',
    'usuario',
    'acciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private sS: FunctionService,
    private router: Router,
    private aPP: App
  ) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number): void {
    this.sS.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(f => f.id !== id);
    });
  }

  editar(id: number): void {
    this.router.navigate(['funcionescine/ediciones', id]);
  }

  isADMIN(): boolean {
    return this.aPP.isAdmin();
  }

  isCLIENTE(): boolean {
    return this.aPP.isCliente();
  }
}

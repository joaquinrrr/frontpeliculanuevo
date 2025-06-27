import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { FunctionService } from '../../../../services/functions.service';
import { LoginService } from '../../../../services/login.service';
import { Function } from '../../../../models/Functions';
import { Users } from '../../../../models/Users';
import { App } from '../../../../app';

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
  styleUrls: ['./listarfunciones.css']
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
  currentUser: Users = new Users();
  username: string = '';  // Variable para almacenar el nombre de usuario

  constructor(
    private functionService: FunctionService,
    private loginService: LoginService,
    private router: Router,
    private app: App
  ) {}

  ngOnInit(): void {
    // Obtener el nombre de usuario desde el servicio LoginService
    this.username = this.loginService.showUsername();

    // Llamamos al servicio para obtener todas las funciones
    this.functionService.list().subscribe((data) => {
      // Filtramos las funciones para mostrar solo las que pertenecen al usuario autenticado
      const filteredFunctions = data.filter((func) => func.user_id.username === this.username);
      // Asignamos las funciones filtradas al DataSource
      this.dataSource = new MatTableDataSource(filteredFunctions);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number): void {
    this.functionService.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(f => f.id !== id);
    });
  }

  editar(id: number): void {
    this.router.navigate(['funcionescine/ediciones', id]);
  }

  isADMIN(): boolean {
    return this.app.isAdmin();
  }

  isCLIENTE(): boolean {
    return this.app.isCliente();
  }
}

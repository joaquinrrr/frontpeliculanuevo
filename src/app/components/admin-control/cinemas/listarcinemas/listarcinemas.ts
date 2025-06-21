import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Cinema } from '../../../../models/Cinema';
import { CinemaService } from '../../../../services/cinema.service';
import { App } from '../../../../app';

@Component({
  selector: 'app-listarcinemas',
  imports: [
    MatTableModule, 
    MatCardModule, 
    CommonModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './listarcinemas.html',
  styleUrl: './listarcinemas.css'
})
export class Listarcinemas {
  displayedColumns: string[] = ['id', 'localname', 'urlimage', 'Cities']
  dataSource: MatTableDataSource<Cinema>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sI:CinemaService, private aPP: App){}
  ngOnInit(): void {
    this.sI.list().subscribe((data)=>{ //agrega los datos en el data source
      this.dataSource = new MatTableDataSource(this.sortGenders(data));
    })
    this.sI.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(this.sortGenders(data))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sI.eliminar(id).subscribe((data) => {
      this.sI.list().subscribe((data) => {
        this.sI.setList(this.sortGenders(data));
      });
    });
  }

  sortGenders(cinema: Cinema[]): Cinema[] {
    return cinema.sort((a, b) => a.id - b.id);
  }

  isADMIN(): boolean {
    return this.aPP.isAdmin();
  }
  isCLIENT(): boolean {
    return this.aPP.isCliente();
  }

}

import { TypePayments } from '../../../../models/TypePayments';
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, ApplicationModule, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { App } from '../../../../app';
import { CitiesService } from '../../../../services/cities.service';
import { Cities } from '../../../../models/Cities';

@Component({
  selector: 'app-listarcities',
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './listarcities.html',
  styleUrl: './listarcities.css'
})
export class Listarcities implements OnInit, AfterViewInit {
dataSource: MatTableDataSource<Cities> = new MatTableDataSource();
  displayedColumns: string[] = [
    
    'id',
    'namecity',
    'delete'
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {}

  constructor(private sS: CitiesService, private router: Router, private aPP:App) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  isObject(value: any): boolean { return typeof value === 'object'; }


  delete(id: number): void {
    this.sS.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(s => s.id !== id);
    });
  }
}

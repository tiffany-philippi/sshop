import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Purchase } from 'src/app/shared/models/purchase';
@Component({
  selector: 'app-purchases-page',
  templateUrl: './purchases-page.component.html',
  styleUrls: ['./purchases-page.component.scss']
})
export class PurchasesPageComponent implements OnInit {
  purchases: Purchase[];
  displayedColumns: string[] = ['name', 'qtd', 'price'];
  dataSource = new MatTableDataSource<Purchase>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private storage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.storage.get('LOCAL_USER_LOGGED');
    if (!user) this.router.navigate(['/admin/login']);

    this.purchases = this.storage.get('LOCAL_PURCHASES');
    this.dataSource.data = this.purchases;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

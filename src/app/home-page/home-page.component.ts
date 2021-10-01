import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { SnackBarService } from '../shared/snack-bar.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  displayedColumns: string[] = ['product', 'description', 'qtd', 'add'];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  products: Product[];

  constructor(
    private snackBarService: SnackBarService,
    private router: Router,
    private storage: LocalStorageService
  ) { }

  ngOnInit(): void {
    const user = this.storage.get('LOCAL_USER_LOGGED');
    if (user) this.router.navigate(['/admin/produtos']);

    this.products = this.storage.get('LOCAL_PRODUCTS_LIST');
    this.dataSource.data = this.products;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event
  ) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeQuantity(item, action) {
    if (action == 'add') {
      item.qtd++;

    } else if (action == 'remove') {
      if (item.qtd == 0) return;
      item.qtd--;

    } else return;
  }

  addItem(element) {
    const cart = this.storage.get('LOCAL_CART');
    let cartItems: any[] = [];

    if (cart != null) cartItems = cart;
    cartItems.push(element);

    this.storage.set('LOCAL_CART', cartItems)

  }
}

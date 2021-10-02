import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { Product } from '../shared/models/product';
import { Purchase } from '../shared/models/purchase';
import { ProductService } from '../shared/products/product.service';
import { SnackBarService } from '../shared/snack-bar.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  nameForm: FormGroup;
  cart: Product[];
  displayedColumns: string[] = ['qtd', 'name', 'description', 'price', 'remove'];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private productService: ProductService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    const user = this.storage.get('LOCAL_USER_LOGGED');
    if (user) this.router.navigate(['/admin/produtos']);

    this.createForm();

    this.cart = this.storage.get('LOCAL_CART');
    this.dataSource.data = this.cart;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createForm() {
    this.nameForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    })
  }

  countItems(price: number, qtd: number) {
    return price * qtd;
  }

  countTotal() {
    let total: number = 0;
    this.cart.forEach(e => {
      total += this.countItems(e.price, e.qtd)
    })
    return total;
  }

  closeCart() {
    if (this.nameForm.valid) {
      let purchase: Purchase[] = [];
      const item: Purchase = {
        name: this.nameForm.value.name,
        qtd: this.cart.length,
        total: this.countTotal()
      }

      const localPurchases = this.storage.get('LOCAL_PURCHASES');

      if (localPurchases != null) purchase = localPurchases;
      purchase.unshift(item);

      this.storage.set('LOCAL_PURCHASES', purchase);
      this.storage.remove('LOCAL_CART')
      this.router.navigate(['/home']);

    } else {
      this.snackBarService.openSnackBar('Preencha corretamente os campos.', 'bg-warning-color');
      return;
    }
  }

}

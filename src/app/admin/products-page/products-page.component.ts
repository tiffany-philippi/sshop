import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  productsForm: FormGroup;
  displayedColumns: string[] = ['product', 'description', 'qtd', 'add'];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  products: Product[];

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private router: Router,
    private storage: LocalStorageService
  ) { }

  ngOnInit(): void {
    const user = this.storage.get('LOCAL_USER_LOGGED');
    if (!user) this.router.navigate(['/admin/login']);
    this.createForm();
    console.log((this.productsForm.controls['productName']));

    this.products = this.storage.get('LOCAL_PRODUCTS_LIST');
    this.dataSource.data = this.products;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createForm() {
    this.productsForm = this.formBuilder.group({
      productName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [0, [Validators.required]],
      qtd: [0],
    })
  }

  addProduct() {
    if (this.productsForm.valid) {
      const product = this.products;
      let productsList: any[] = [];

      if (product != null) productsList = product;
      productsList.unshift(this.productsForm.value);

      this.storage.set('LOCAL_PRODUCTS_LIST', productsList);
      this.snackBarService.openSnackBar('Cadastrado com sucesso', 'bg-blue-color');
      location.reload();
      return;

    } else {
      this.snackBarService.openSnackBar('Preencha corretamente os campos.', 'bg-warning-color');
      return;
    }
  }

  removeProduct(item: Product) {
    const products = this.products;
    let filteredProducts = [];
    const id = item.productName;

    for (let i = 0; i < products.length; i++) {
      if (products[i].productName !== id) {
        filteredProducts.push(products[i])
      }
    }

    this.storage.set('LOCAL_PRODUCTS_LIST', filteredProducts);
    location.reload();
    return;
  }

}

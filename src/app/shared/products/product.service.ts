import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SnackBarService } from '../snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private snackBarService: SnackBarService,
    private storage: LocalStorageService

  ) { }

  changeQuantity(item: Product, action: string) {
    if (action == 'add') {
      item.qtd++;

    } else if (action == 'remove') {
      if (item.qtd == 0) return;
      item.qtd--;

    } else return;
    return item.qtd;
  }

  addItem(element: Product) {
    const cart = this.storage.get('LOCAL_CART');
    let cartItems: any[] = [];

    if (cart != null) cartItems = cart;
    cartItems.push(element);

    this.storage.set('LOCAL_CART', cartItems)
    this.snackBarService.openSnackBar(`${element.productName} adicionado`, 'bg-blue-color');
  }


  removeProduct(item: Product) {
    const products = this.storage.get('LOCAL_PRODUCTS_LIST');
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

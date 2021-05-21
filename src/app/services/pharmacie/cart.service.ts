import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Product} from '../../models/Pharmacie/product.model';
import {CartItem} from '../../models/Pharmacie/cartItem.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: CartItem[] = [];
  public cartItems = new Subject<CartItem[]>();

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar) {
    // this.cartItems.subscribe(
    //   products => this.products = products
    // );
  }

  productsSub(): Observable<any> {
    return this.cartItems.asObservable();
  }

  getcart(pharmacie: string): void {
    this.http.put<any>('http://localhost:3000/patient/getcart', {pharmacie})
      .subscribe(items => {
        let products: CartItem[] = [];
        for (let product of items.cart[0].products) {
          // console.log(product);
          // product.id = product._id;
          products.push({product: product.product, quantity: product.quantity});
        }
        // this.products = items.cart[0].products;
        this.products = products;
        this.cartItems.next([...this.products]);
      });
  }

  addToCart(product: Product, quantity: number, pharmacie: string): boolean | CartItem {
    let message, status;
    let item: CartItem | boolean = false;
    // If Products exist
    const hasItem = this.products.find((items, index) => {
      if (items.product.id === product.id) {
        const qty = this.products[index].quantity + quantity;
        const stock = this.calculateStockCounts(this.products[index], quantity);
        if (qty !== 0 && stock) {
          this.products[index].quantity = qty;
          message = 'Le produit ' + product.name + ' a été ajouté au panier.';
          status = 'success';
          this.snackBar.open(message, '×', {panelClass: [status], verticalPosition: 'top', duration: 3000});
        }
        return true;
      }
    });

    // If Products does not exist (Add New Products)
    if (!hasItem) {
      item = {product, quantity};
      this.products.push(item);
      message = 'Le produit ' + product.name + ' a été ajouté au panier.';
      status = 'success';
      this.snackBar.open(message, '×', {panelClass: [status], verticalPosition: 'top', duration: 3000});
    }
    this.http.put<any>('http://localhost:3000/patient/addtocart', {products: this.products, pharmacie})
      .subscribe(items => {
      // this.cartItems.next(items.cart[0].products);
      // this.products = items.cart[0].products;
      let products: CartItem[] = [];
      for (let product of items.cart[0].products) {
        products.push({product: product.product, quantity: product.quantity});
      }
      this.products = products;
      this.cartItems.next([...this.products]);
    });
    return item;
  }

  public getTotalAmount(): number {
    // return this.cartItems.pipe(map((product: CartItem[]) => {
      return this.products.reduce((prev, curr: CartItem) => {
        return prev + curr.product.price * curr.quantity;
      }, 0);
    // }));
  }

  // Update Cart Value
  public updateCartQuantity(product: Product, quantity: number, pharmacie: string): CartItem | boolean {
    return this.products.find((items, index) => {
      if (items.product.id === product.id) {
        let qty = this.products[index].quantity + quantity;
        let stock = this.calculateStockCounts(this.products[index], quantity);
        if (qty !== 0 && stock) {
          this.products[index].quantity = qty;
        }
        this.http.put<any>('http://localhost:3000/patient/addtocart', {products: this.products, pharmacie})
          .subscribe(items => {
            // this.cartItems.next(items.cart[0].products);
            // this.products = items.cart[0].products;
            let products: CartItem[] = [];
            for (let product of items.cart[0].products) {
              products.push({product: product.product, quantity: product.quantity});
            }
            this.products = products;
            this.cartItems.next([...this.products]);
          });
        return true;
      }
    });
  }
  // getcart(pharmacie: string): void {
  //   this.http.put<any>('http://localhost:3000/patient/getcart', {pharmacie})
  //     .subscribe(items => {
  //       let products: CartItem[] = [];
  //       for (let product of items.cart[0].products) {
  //         products.push({product: product.product, quantity: product.quantity});
  //       }
  //       // this.products = items.cart[0].products;
  //       this.products = products;
  //       this.cartItems.next(products);
  //     });
  // }

  public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
    let message, status;
    const qty = product.quantity + quantity;
    const stock = product.product.stock;
    if (stock < qty) {
      // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
      // tslint:disable-next-line:max-line-length
      this.snackBar.open('Vous ne pouvez pas choisir plus d\'articles que disponibles. En stock ' + stock + ' articles.', '×', {
        panelClass: 'error',
        verticalPosition: 'top',
        duration: 3000
      });
      return false;
    }
    return true;
  }
  public removeFromCart(item: CartItem, pharmacie: string) {
    if (item === undefined) { return false; }
    const index = this.products.indexOf(item);
    this.products.splice(index, 1);
    this.http.put<any>('http://localhost:3000/patient/addtocart', {products: this.products, pharmacie})
      .subscribe(items => {
        // this.cartItems.next(items.cart[0].products);
        // this.products = items.cart[0].products;
        let products: CartItem[] = [];
        for (let product of items.cart[0].products) {
          products.push({product: product.product, quantity: product.quantity});
        }
        this.products = products;
        this.cartItems.next([...this.products]);
      });
  }
}

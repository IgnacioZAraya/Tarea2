import { Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { IProduct } from "../interfaces";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductsService extends BaseService<IProduct> {
  protected override source: string = "products";
  private productListSignal = signal<IProduct[]>([]);
  get products$() {
    return this.productListSignal;
  }
  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.productListSignal.set(response);
      },
      error: (error: any) => {
        console.error("Error fetching users", error);
      },
    });
  }
  saveProductSignal(product: IProduct): Observable<any> {
    return this.add(product).pipe(
      tap((response: any) => {
        this.productListSignal.update((products) => [response, ...products]);
      }),
      catchError((error) => {
        console.error("Error saving user", error);
        return throwError(error);
      })
    );
  }
  updateProductSignal(product: IProduct): Observable<any> {
    return this.edit(product.id, product).pipe(
      tap((response: any) => {
        const updatedProducts = this.productListSignal().map((p) =>
          p.id === product.id ? response : p
        );
        this.productListSignal.set(updatedProducts);
      }),
      catchError((error) => {
        console.error("Error saving user", error);
        return throwError(error);
      })
    );
  }
  deleteProductSignal(product: IProduct): Observable<any> {
    return this.del(product.id).pipe(
      tap((response: any) => {
        const updatedProducts = this.productListSignal().filter(
          (p) => p.id !== product.id
        );
        this.productListSignal.set(updatedProducts);
      }),
      catchError((error) => {
        console.error("Error saving user", error);
        return throwError(error);
      })
    );
  }
}

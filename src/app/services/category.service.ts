import { Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { ICategory } from "../interfaces";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends BaseService<ICategory> {
  protected override source: string = "categories";
  private categoryListSignal = signal<ICategory[]>([]);
  get categories$() {
    return this.categoryListSignal;
  }
  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.categoryListSignal.set(response);
      },
      error: (error: any) => {
        console.error("Error fetching users", error);
      },
    });
  }
  saveCategorySignal(category: ICategory): Observable<any> {
    return this.add(category).pipe(
      tap((response: any) => {
        this.categoryListSignal.update((categories) => [
          response,
          ...categories,
        ]);
      }),
      catchError((error) => {
        console.error("Error saving user", error);
        return throwError(error);
      })
    );
  }
  updateCategorySignal(category: ICategory): Observable<any> {
    return this.edit(category.id, category).pipe(
      tap((response: any) => {
        const updatedProducts = this.categoryListSignal().map((c) =>
          c.id === category.id ? response : c
        );
        this.categoryListSignal.set(updatedProducts);
      }),
      catchError((error) => {
        console.error("Error saving user", error);
        return throwError(error);
      })
    );
  }
  deleteCategorySignal(category: ICategory): Observable<any> {
    return this.del(category.id).pipe(
      tap((response: any) => {
        const updatedCategories = this.categoryListSignal().filter(
          (c) => c.id !== category.id
        );
        this.categoryListSignal.set(updatedCategories);
      }),
      catchError((error) => {
        console.error("Error saving user", error);
        return throwError(error);
      })
    );
  }
}

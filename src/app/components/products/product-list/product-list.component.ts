import { Component, effect, inject } from "@angular/core";
import { IProduct } from "../../../interfaces";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalComponent } from "../../modal/modal.component";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ProductFormComponent } from "../product-form/product-form.component";
import { ProductsService } from "../../../services/product.service";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    ProductFormComponent,
    MatSnackBarModule,
  ],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.scss",
})
export class ProductListComponent {
  public search: String = "";
  public productList: IProduct[] = [];
  private service = inject(ProductsService);
  private snackBar = inject(MatSnackBar);
  public currentProduct: IProduct = {
    description: "",
    price: 0,
    stockSize: 0,
    name: "",
  };

  constructor() {
    this.service.getAllSignal();
    effect(() => {
      this.productList = this.service.products$();
    });
  }

  showDetail(product: IProduct, modal: any) {
    this.currentProduct = { ...product };
    modal.show();
  }

  deleteProduct(product: IProduct) {
    this.service.deleteProductSignal(product).subscribe({
      next: () => {
        this.snackBar.open("Product deleted", "Close", {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 5 * 1000,
        });
      },
      error: (error: any) => {
        this.snackBar.open("Error deleting product", "Close", {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });
      },
    });
  }
}

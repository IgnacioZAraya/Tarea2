import { Component } from "@angular/core";
import { ProductListComponent } from "../../components/products/product-list/product-list.component";
import { ProductFormComponent } from "../../components/products/product-form/product-form.component";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { AuthService } from "../../services/auth.service";
import { IRole } from "../../interfaces";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [
    ProductFormComponent,
    ProductListComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
  ],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent {
  public superRole: boolean;

  constructor(private authService: AuthService) {
    this.superRole = this.authService.hasRole(IRole.superAdmin);
  }
}

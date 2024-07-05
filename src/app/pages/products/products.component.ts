import { Component } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [
    ProductsListComponent,
    ProductsFormComponent,
    LoaderComponent,
    ModalComponent,
  ],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent {}

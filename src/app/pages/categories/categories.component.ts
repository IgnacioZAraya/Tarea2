import { CommonModule } from "@angular/common";
import { AuthService } from "./../../services/auth.service";
import { Component } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { CategoryListComponent } from "../../components/categories/category-list/category-list.component";
import { CategoryFormComponent } from "../../components/categories/category-form/category-form.component";
import { IRole } from "../../interfaces";

@Component({
  selector: "app-categories",
  standalone: true,
  imports: [
    CategoryListComponent,
    CategoryFormComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
  ],
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
})
export class CategoriesComponent {
  public superRole: boolean;

  constructor(private authService: AuthService) {
    this.superRole = this.authService.hasRole(IRole.superAdmin);
  }
}

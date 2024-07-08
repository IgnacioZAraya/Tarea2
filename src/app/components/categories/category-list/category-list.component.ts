import { Component, effect, inject } from "@angular/core";
import { ICategory, IRole } from "../../../interfaces";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalComponent } from "../../modal/modal.component";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { CategoryFormComponent } from "../category-form/category-form.component";
import { CategoryService } from "../../../services/category.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-category-list",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    CategoryFormComponent,
    MatSnackBarModule,
  ],
  templateUrl: "./category-list.component.html",
  styleUrl: "./category-list.component.scss",
})
export class CategoryListComponent {
  public superRole: boolean;
  public search: String = "";
  public categoryList: ICategory[] = [];
  private service = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  public currentCategory: ICategory = {
    description: "",
    name: "",
  };

  constructor(private authService: AuthService) {
    this.service.getAllSignal();
    effect(() => {
      this.categoryList = this.service.categories$();
    });

    this.superRole = this.authService.hasRole(IRole.superAdmin);
  }

  showDetail(category: ICategory, modal: any) {
    this.currentCategory = { ...category };
    modal.show();
  }

  deleteCategory(category: ICategory) {
    this.service.deleteCategorySignal(category).subscribe({
      next: () => {
        this.snackBar.open("Category deleted", "Close", {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 5 * 1000,
        });
      },
      error: (error: any) => {
        this.snackBar.open("Error deleting category", "Close", {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });
      },
    });
  }
}

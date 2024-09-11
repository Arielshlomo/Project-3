import { Injectable } from '@angular/core';
import { Category } from '../shared/interface/category.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private readonly collectionName = 'categories';
    private categoriesRef: AngularFirestoreCollection<any> | undefined = undefined;

    constructor(
        public router: Router,
        private _snackBar: MatSnackBar,
        private firestore: AngularFirestore,
    ) {
        this.categoriesRef = this.firestore.collection(this.collectionName);
    }

    addCategory(category: Category) {
        category.numericIdentifier = this.generateNumericIdentifier();
        category.lastModificationDate = new Date();
        this.categoriesRef?.add(category)
            .then(() => {
                this.router.navigate(['/language-game/category']);
                this.openSnackBar("Category Added Successfully !", 'snackbar-green');
            })
            .catch(error => {
                console.error('Error adding category:', error);
                this.openSnackBar('Failed to add category !', 'snackbar-red');
            });
    }

    deleteCategory(numericIdentifier: any) {
        this.categoriesRef?.doc(numericIdentifier.toString())
            .delete()
            .then(() => {
                this.openSnackBar('Category Deleted Successfully !', 'snackbar-green');
            })
            .catch(error => {
                console.error('Error deleting category:', error);
                this.openSnackBar('Failed to delete category !', 'snackbar-red');
            });
    }

    updateCategory(category: Category) {
        category.lastModificationDate = new Date();
        this.categoriesRef?.doc(category.numericIdentifier.toString())
            .update(category)
            .then(() => {
                this.router.navigate(['/language-game/category']);
                this.openSnackBar('Category Updated Successfully !', 'snackbar-green');
            })
            .catch(error => {
                console.error('Error updating category:', error);
                this.openSnackBar('Failed to update category !', 'snackbar-red');
            });
    }

    getAllCategories() {
        return this.categoriesRef?.get()
            .toPromise()
            .then((snapshot: any) => {
                return snapshot.docs.map((doc: any) => {
                    const data = doc.data() as Category;
                    data.numericIdentifier = doc.id;
                    return data;
                });
            })
            .catch(error => {
                console.error('Error getting categories:', error);
                return [];
            });
    }

    getCategoryById(numericIdentifier: number) {
        return this.categoriesRef?.doc(numericIdentifier.toString())
            .get()
            .toPromise()
            .then((docSnapshot: any) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data() as Category;
                    data.numericIdentifier = docSnapshot.id;
                    return data;
                }
                else {
                    this.openSnackBar("Category With Id Doesn't Exist ! ", "snackbar-red");
                    this.router.navigate(['/language-game/category']);
                    return undefined;
                }
            })
            .catch(error => {
                console.error('Error getting category:', error);
                return undefined;
            });
    }

    openSnackBar(message: string, className?: string) {
        this._snackBar.open(message, '', { duration: 2000, panelClass: className ? className : 'snackbar-red' });
    }

    private generateNumericIdentifier(): string {
        return Math.floor(Math.random() * 1000).toString();
    }
}
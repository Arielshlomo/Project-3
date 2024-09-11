import { Component, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../shared/interface/category.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { GlobalService } from '../../services/global.service';
import { ExitButtonComponent } from '../../exit-button/exit-button.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-playing-game',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatToolbarModule,
    MatCardModule,
    ExitButtonComponent,
    HeaderComponent
  ],
  templateUrl: './playing-game.component.html',
  styleUrl: './playing-game.component.css'
})
export class PlayingGameComponent {

  @Input() id: any;
  categoriesObject: any = {};
  categoryIdentifier: any = -1;
  selectedCategoryId: number = -1;
  translationForm: any;
  correctTranslation: number = 0;
  translationChecked: boolean = false;
  retryLeft: number = 0;

  constructor(
    public CategoryService: CategoryService,
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public GlobalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.categoryIdentifier = this.id;
    this.GlobalService.showSpinner = true;
    if (this.categoryIdentifier) {
      this.CategoryService.getCategoryById(this.categoryIdentifier)?.then(
        (category) => {
          this.categoriesObject = category;
          this.initForm(this.categoriesObject);
          this.retryLeft = this.categoriesObject.words.length;
          this.GlobalService.showSpinner = false;
        }
      );
    }
    else {
      this.router.navigate(['/'])
    }
  }

  private initForm(availableData?: Category): void {
    this.translationForm = this.formBuilder.group({
      words: this.formBuilder.array([], [Validators.required, Validators.minLength(1)])
    })
    if (availableData?.words) {
      availableData?.words.forEach(word => {
        this.addWord(word);
      });
    }
  }

  addWord(wordData?: any): void {
    const wordGroup = this.formBuilder.group({
      sourceLanguage: [wordData?.sourceLanguage || '', Validators.required],
      targetLanguage: ['', Validators.required],
      isCorrect: [null]
    });
    this.words.push(wordGroup);
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
  }

  checkTranslation() {
    let wordsArray = this.words.controls;
    let availableWords = this.categoriesObject.words;
    let correctTranslation = 0;

    for (let i = 0; i < wordsArray.length; i++) {
      const targetLanguage = wordsArray[i].get('targetLanguage')?.value;
      if (targetLanguage) {
        if (availableWords[i]?.targetLanguage === targetLanguage) {
          wordsArray[i].get('isCorrect')?.setValue(true);
          correctTranslation = correctTranslation + 1;
        } else {
          wordsArray[i].get('isCorrect')?.setValue(false);
        }
      }
    }

    this.correctTranslation = correctTranslation;
    this.retryLeft = this.retryLeft - 1;
    this.translationChecked = true;

    if (this.correctTranslation == this.categoriesObject.words.length) {
      this.CategoryService.openSnackBar("Well Done !" + `You translated all words correctly.`, 'snackbar-green');
    }
    else if (this.retryLeft > 0) {
      this.CategoryService.openSnackBar("Sorry !" +
        `You translated ${correctTranslation} out of ${this.categoriesObject.words.length} words correctly. Please try again.`);
    }
    else if (this.retryLeft == 0) {
      this.CategoryService.openSnackBar("Out of Retries !" +
        `You have used all retry attempts. Please check translation.`);
    }
  }

  seeTranslation() {
    let wordsArray = this.words.controls;
    let availableWords = this.categoriesObject.words;
    for (let i = 0; i < wordsArray.length; i++) {
      wordsArray[i].get('targetLanguage')?.setValue(availableWords[i]?.targetLanguage);
      wordsArray[i].get('isCorrect')?.setValue(null);
    }
  }

  get words(): FormArray {
    return this.translationForm.get('words') as FormArray;
  }

}

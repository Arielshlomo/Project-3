import { Component, Input } from '@angular/core';
import { TranslatedWord } from '../../../shared/interface/translated-word.interface';
import { WordStatus } from '../../../shared/enum/word-status.enum';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { CategoryService } from '../../../services/category.service';
import { MatchSingleWordComponent } from '../match-single-word/match-single-word.component';
import { Category } from '../../../shared/interface/category.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { GamePointsService } from '../../../services/game-played.service';
import { ExitButtonComponent } from '../../../exit-button/exit-button.component';

@Component({
  selector: 'app-matching-word',
  standalone: true,
  imports: [MatchSingleWordComponent, ExitButtonComponent, FormsModule, ReactiveFormsModule, CommonModule, HeaderComponent, MatToolbarModule, MatIconModule, MatCardModule],
  templateUrl: './matching-word.component.html',
  styleUrl: './matching-word.component.css'
})

export class MatchingWordComponent {
  @Input() id: any;
  sourceWords: TranslatedWord[] = [];
  targetWords: string[] = [];
  sourceWordStatuses: WordStatus[] = [];
  targetWordStatuses: WordStatus[] = [];
  attempts = 0;
  successes = 0;
  currentPoints = 16;
  totalPoints = 0;

  selectedSourceIndex: number | null = null;
  selectedTargetIndex: number | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public CategoryService: CategoryService,
    public GamePointsService: GamePointsService
  ) { }

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    if (this.id) {
      this.CategoryService.getCategoryById(this.id)?.then(
        (category: any) => {
          if (category.words.length < 5) {
            this.router.navigate(['/category-selection']);
          }
          else {
            this.sourceWords = category.words.slice(0, 5).sort(() => Math.random() - 0.5);
            this.targetWords = this.sourceWords.map(word => word.targetLanguage).sort(() => Math.random() - 0.5);
            this.sourceWordStatuses = Array(5).fill(WordStatus.Normal);
            this.targetWordStatuses = Array(5).fill(WordStatus.Normal);
          }
        },
        error => {
          console.error('Error retrieving random words:', error);
        }
      );
    }
    else {
      this.router.navigate(['/'])
    }
  }

  onWordClick(index: number, isSource: boolean): void {
    if (isSource && this.sourceWordStatuses[index] != WordStatus.Disabled) {
      if (this.selectedSourceIndex !== null) {
        this.sourceWordStatuses[this.selectedSourceIndex] = WordStatus.Normal;
      }
      this.selectedSourceIndex = index;
      this.sourceWordStatuses[index] = WordStatus.Selected;
    }
    else if (this.targetWordStatuses[index] != WordStatus.Disabled) {
      if (this.selectedTargetIndex !== null) {
        this.targetWordStatuses[this.selectedTargetIndex] = WordStatus.Normal;
      }
      this.selectedTargetIndex = index;
      this.targetWordStatuses[index] = WordStatus.Selected;
    }
    if (this.selectedSourceIndex !== null &&
      this.selectedTargetIndex !== null &&
      this.targetWordStatuses[this.selectedTargetIndex] != WordStatus.Disabled &&
      this.sourceWordStatuses[this.selectedSourceIndex] != WordStatus.Disabled
    ) {
      this.checkMatch();
    }
  }

  checkMatch(): void {
    const sourceWord = this.sourceWords[this.selectedSourceIndex!];
    const targetWord = this.targetWords[this.selectedTargetIndex!];

    this.attempts++;

    if (sourceWord?.targetLanguage === targetWord) {
      this.sourceWordStatuses[this.selectedSourceIndex!] = WordStatus.Disabled;
      this.targetWordStatuses[this.selectedTargetIndex!] = WordStatus.Disabled;
      this.totalPoints += this.currentPoints;
      this.currentPoints = 16;
      this.successes++;
      this.openMatchResultDialog(true, "You have selected the right word. Welldone.");
    }
    else {
      this.currentPoints = Math.max(0, this.currentPoints - 2);
      this.openMatchResultDialog(false, "You have selected wrong word. Please try again !");

      this.sourceWordStatuses[this.selectedSourceIndex!] = WordStatus.Normal;
      this.targetWordStatuses[this.selectedTargetIndex!] = WordStatus.Normal;
    }

    this.selectedSourceIndex = null;
    this.selectedTargetIndex = null;

    if (this.successes === 5) {
      this.showGameSummary();
    }
  }

  openMatchResultDialog(isMatch: boolean, message: string): void {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      data: { isMatch, message }
    });
  }

  saveGameResults(): void {
    const gameResult = {
      gameId: 'Match the Words',
      categoryId: this.id,
      points: this.totalPoints,
      date: new Date()
    };
    this.GamePointsService.addGamePlayed(gameResult);
  }

  showGameSummary(): void {
    // Display game summary dialog with total points, attempts, and word translations
    // Send game data to the service managing game points
    this.saveGameResults();
  }
}

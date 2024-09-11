import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { GamePointsService } from '../../../services/game-played.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { ResultDialogComponent } from '../../matching-game/result-dialog/result-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ExitButtonComponent } from '../../../exit-button/exit-button.component';

@Component({
  selector: 'app-scrambled-word',
  standalone: true,
  imports: [FormsModule, ExitButtonComponent, ReactiveFormsModule, MatButtonModule, CommonModule, HeaderComponent, MatToolbarModule, MatIconModule, MatInputModule, MatCardModule, MatProgressBarModule],
  templateUrl: './scrambled-word.component.html',
  styleUrl: './scrambled-word.component.css'
})

export class ScrambledWordComponent implements OnInit {
  @Input() id: any;
  words: any[] = [];
  currentWordIndex = 0;
  correctWordIndex: any = [];
  scrambledWord = '';
  userGuess = '';
  currentPoints = 0;
  isGameOver = false;
  category: any;

  constructor(
    private gamePointsService: GamePointsService,
    private dialog: MatDialog,
    public router: Router,
    public CategoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    if (this.id) {
      this.CategoryService.getCategoryById(this.id)?.then(
        (category: any) => {
          this.category = category;
          if (category.words.length == 0) {
            this.router.navigate(['/category-selection']);
          }
          else {
            this.words = category.words;
            this.scrambleCurrentWord();
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

  scrambleCurrentWord(): void {
    const currentWord = this.words[this.currentWordIndex];
    this.scrambledWord = this.scrambleWord(currentWord.sourceLanguage);
  }

  checkGuess(): void {
    const currentWord = this.words[this.currentWordIndex];
    if (this.userGuess.toLowerCase() === currentWord.targetLanguage.toLowerCase()) {
      this.currentPoints++;
      this.correctWordIndex.push(this.currentWordIndex);
      this.openMatchResultDialog(true, "Welldone ! You have guess the right word !");
    } else {
      this.openMatchResultDialog(false, "Incorrect guess, Please try again later !");
    }
    this.moveToNextWord();
  }

  moveToNextWord(): void {
    this.userGuess = '';
    this.currentWordIndex++;
    if (this.currentWordIndex < this.words.length) {
      this.scrambleCurrentWord();
    } else {
      this.isGameOver = true;
      this.saveGameResults();
    }
  }

  resetGuess(): void {
    this.userGuess = '';
  }

  get progress(): number {
    return (this.currentWordIndex / this.words.length) * 100;
  }

  saveGameResults(): void {
    const gameResult = {
      gameId: 'Scrambled Words',
      categoryId: this.id,
      points: this.currentPoints,
      date: new Date()
    };
    this.gamePointsService.addGamePlayed(gameResult);
  }

  scrambleWord(word: string): string {
    const scrambledLetters = word.split('').sort(() => Math.random() - 0.5);
    return scrambledLetters.join('');
  }

  openMatchResultDialog(isMatch: boolean, message: string): void {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      data: { isMatch, message }
    });
  }
}
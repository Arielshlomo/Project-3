import { Component, Input } from '@angular/core';
import { WordStatus } from '../../../shared/enum/word-status.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-match-single-word',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  templateUrl: './match-single-word.component.html',
  styleUrl: './match-single-word.component.css'
})
export class MatchSingleWordComponent {
  @Input() word: string = "";
  @Input() status!: WordStatus;
  wordStatus = WordStatus;
}

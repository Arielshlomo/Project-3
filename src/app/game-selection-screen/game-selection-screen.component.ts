import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-game-selection-screen',
  standalone: true,
  imports: [HeaderComponent, CommonModule, MatFormFieldModule, RouterLink, RouterLinkActive, MatButtonModule, MatRadioModule, FormsModule, MatToolbarModule, MatCardModule],
  templateUrl: './game-selection-screen.component.html',
  styleUrl: './game-selection-screen.component.css'
})
export class GameSelectionScreenComponent {

  selectedGame: 'translation' | 'match' | 'scramble' = 'match';

  constructor() {

  }

  startGame() {
    switch (this.selectedGame) {
      case 'translation':

        break;
      case 'match':

        break;
      case 'scramble':

        break
      default:
        break;
    }
  }

}

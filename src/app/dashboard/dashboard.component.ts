import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../shared/components/header/header.component';
import { CategoryService } from '../services/category.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, HeaderComponent, MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalPoints = 0;
  numberOfGamesPlayed = 0;
  gameTypeWithHighestAverageScore = '';
  gameTypeWithLowestAverageScore = '';
  numberOfCategoriesLearned = 0;
  numberOfCategoriesNotLearned = 0;
  percentageOfPerfectScoreGames = 0;
  mostPlayedCategory = '';

  constructor(private DashboardService: DashboardService, public CategoryService: CategoryService, public GlobalService: GlobalService) { }

  ngOnInit(): void {
    this.GlobalService.toggleSpinner();
    this.CategoryService.getAllCategories()?.then(
      (categories: any) => {
        this.DashboardService.categories = categories;
        this.DashboardService.updateGamePlayedList();
        this.totalPoints = this.DashboardService.getTotalPoints();
        this.numberOfGamesPlayed = this.DashboardService.getNumberOfGamesPlayed();
        this.gameTypeWithHighestAverageScore = this.DashboardService.getGameTypeWithHighestAverageScore();
        this.gameTypeWithLowestAverageScore = this.DashboardService.getGameTypeWithLowestAverageScore();
        this.numberOfCategoriesLearned = this.DashboardService.getNumberOfCategoriesLearned();
        this.numberOfCategoriesNotLearned = this.DashboardService.getNumberOfCategoriesNotLearned();
        this.percentageOfPerfectScoreGames = this.DashboardService.getPercentageOfPerfectScoreGames();
        this.mostPlayedCategory = this.DashboardService.getMostPlayedCategory();
        this.GlobalService.toggleSpinner();
      },
      error => {
        console.error('Error retrieving random words:', error);
        this.GlobalService.toggleSpinner();
      }
    );
  }
}
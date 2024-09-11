import { Injectable } from '@angular/core';
import { GamePointsService } from './game-played.service';
import { Category } from '../shared/interface/category.interface';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private gamesPlayed: any[] = [];
    public categories: any[] = [];

    constructor(public GamePointService: GamePointsService) { }

    updateGamePlayedList() {
        this.gamesPlayed = this.GamePointService.list();
    }

    addGamePlayed(game: any): void {
        this.gamesPlayed.push(game);
    }

    getTotalPoints(): number {
        return this.gamesPlayed.reduce((total, game) => total + game.points, 0);
    }

    getNumberOfGamesPlayed(): number {
        return this.gamesPlayed.length;
    }

    getGameTypeWithHighestAverageScore(): string {
        const gameScores: { [gameId: string]: number[] } = {};
        this.gamesPlayed.forEach(game => {
            if (!gameScores[game.gameId]) {
                gameScores[game.gameId] = [];
            }
            gameScores[game.gameId].push(game.points);
        });
        let highestAverage = 0;
        let highestGameId = '';

        for (const gameId in gameScores) {
            const scores = gameScores[gameId];
            const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
            if (average > highestAverage) {
                highestAverage = average;
                highestGameId = gameId;
            }
        }
        return highestGameId;
    }

    getGameTypeWithLowestAverageScore(): string {
        const gameScores: { [gameId: string]: number[] } = {};
        this.gamesPlayed.forEach(game => {
            if (!gameScores[game.gameId]) {
                gameScores[game.gameId] = [];
            }
            gameScores[game.gameId].push(game.points);
        });
        let lowestAverage = Infinity;
        let lowestGameId = '';

        for (const gameId in gameScores) {
            const scores = gameScores[gameId];
            const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
            if (average < lowestAverage) {
                lowestAverage = average;
                lowestGameId = gameId;
            }
        }
        return lowestGameId;
    }

    getNumberOfCategoriesLearned(): number {
        const learnedCategories = new Set(this.gamesPlayed.map(game => game.categoryId));
        return learnedCategories.size;
    }

    getNumberOfCategoriesNotLearned(): number {
        const totalCategories = this.categories.length;
        const learnedCategories = new Set(this.gamesPlayed.map(game => game.categoryId));
        return totalCategories - learnedCategories.size;
    }

    getPercentageOfPerfectScoreGames(): number {
        const perfectScoreGames = this.gamesPlayed.filter(game => game.points === 100);
        return (perfectScoreGames.length / this.gamesPlayed.length) * 100;
    }

    getMostPlayedCategory(): string {
        const categoryCounts: { [categoryId: string]: number } = {};

        this.gamesPlayed.forEach(game => {
            if (!categoryCounts[game.categoryId]) {
                categoryCounts[game.categoryId] = 0;
            }
            categoryCounts[game.categoryId]++;
        });

        let mostPlayedCategoryId = '';
        let highestCount = 0;

        for (const categoryId in categoryCounts) {
            const count = categoryCounts[categoryId];
            if (count > highestCount) {
                highestCount = count;
                mostPlayedCategoryId = categoryId;
            }
        }
        console.log("this.categories : ", this.categories)
        return this.categories.find((x: Category) => x.numericIdentifier == mostPlayedCategoryId)?.categoryName;
    }
}
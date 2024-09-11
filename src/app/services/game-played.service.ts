
import { Injectable } from '@angular/core';
import { GamePlayed } from '../shared/interface/game-played.interface';

@Injectable({
    providedIn: 'root'
})
export class GamePointsService {
    private readonly localStorageKey = 'gamePlayed';

    constructor() { }

    list(): GamePlayed[] {
        const gamesPlayedJson = localStorage.getItem(this.localStorageKey);
        return gamesPlayedJson ? JSON.parse(gamesPlayedJson) : [];
    }

    addGamePlayed(game: GamePlayed): void {
        const gamesPlayed = this.list();
        gamesPlayed.push(game);
        localStorage.setItem(this.localStorageKey, JSON.stringify(gamesPlayed));
    }
}
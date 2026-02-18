import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataModService, DataService } from '../shared';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [DataModService, DataService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly dataService = inject(DataService);
  private readonly dataModService = inject(DataModService);
  public showDogs = signal(false);
  public currPage = signal(1);
  public dogNames = computed(() => this.dataModService.getDogNames());

  public getDogsFromApi(): void {
    this.getDogs();
  }

  public changeShowDogs(): void {
    this.showDogs.update((prev) => !prev);
  }

  public nextPage(): void {
    this.currPage.update((pg) => pg+1);
    this.getDogs();
  }

  public prevPage(): void {
    if(this.currPage() > 1) {
      this.currPage.update((pg) => pg-1);
      this.getDogs();
    }
  }

  private getDogs(): void {
    this.dataService.getDogBreeds(this.currPage()).pipe(take(1)).subscribe();
  }
}

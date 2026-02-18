import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataModService, DataService } from '../shared';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { take, tap } from 'rxjs';
import { DogDialog } from '../shared/components/dog-dialog/dog-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatDialogModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly dataService = inject(DataService);
  private readonly dataModService = inject(DataModService);
  private readonly dialog = inject(MatDialog);

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

  public openDialog(): void {
    this.dialog.open(DogDialog).afterClosed().subscribe((res) => {
      console.log('dialog closed', res);
    });
  }

  private getDogs(): void {
    this.dataService.getDogBreeds(this.currPage()).pipe(take(1)).subscribe();
  }
}

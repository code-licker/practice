import { Component, computed, inject } from '@angular/core';
import { DataModService } from '../../data-modify.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dog-dialog',
  imports: [MatDialogModule],
  templateUrl: './dog-dialog.html',
  styleUrl: './dog-dialog.scss',
})
export class DogDialog {
  private readonly dataModService = inject(DataModService);
  public dogNames = computed(() => this.dataModService.getDogNames());
}

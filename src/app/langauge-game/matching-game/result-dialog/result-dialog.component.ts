import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './result-dialog.component.html',
  styleUrl: './result-dialog.component.css'
})
export class ResultDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { isMatch: boolean, message: string }) { }
}

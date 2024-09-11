import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-exit-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './exit-button.component.html',
  styleUrl: './exit-button.component.css'
})
export class ExitButtonComponent {
  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

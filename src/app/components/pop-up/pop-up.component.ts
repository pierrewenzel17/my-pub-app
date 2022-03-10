import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Beer } from 'app/models/beer';

export type PopupAction = Beer & {mode: string};

@Component({
  selector: 'popup',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {

  constructor(public dialogRef: MatDialogRef<PopUpComponent>) {}

  closeDialog(result: Beer & {mode?: string} | null = null) {
    this.dialogRef.close(result);
  }

  onCancel() {
    this.closeDialog();
  }

  onCreate(beer: Beer) {
    this.closeDialog({...beer, mode: 'create'});
  }

  onUpdate(beer: Beer) {
    this.closeDialog({...beer, mode: 'update'});
  }

}
import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatCard, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {Group} from '../../models/groupe';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';

@Component({
  selector: 'app-create-groupe',
  imports: [CommonModule, ReactiveFormsModule,
    MatDialogContent, MatCardHeader, MatCard,
    MatFormField, MatInput, MatLabel, MatFormField,
    MatCardTitle, MatButton, MatDialogActions,
    MatIcon, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatSuffix],
  standalone:true,
  templateUrl: './create-groupe.html',
  styleUrl: './create-groupe.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGroupe implements OnInit{

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<CreateGroupe>,
              @Inject(MAT_DIALOG_DATA) public data: { titre: string; group?: Group }
  )   { }

  ngOnInit(): void {
    const groupe = this.data.group;

    this.form = this.fb.group({
      id: [groupe?.id],
      name: [groupe?.name],
      atCreate: [groupe?.atCreate]
    });
  }


  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      console.log('[DEBUG] Méthode save() appelée')
      const groupe: Group = this.form.value;
      this.dialogRef.close(groupe);  // envoie les données au parent via la fermeture du dialog
    }
  }
}

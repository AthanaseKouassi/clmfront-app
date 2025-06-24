import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {Gender, MaritalStatus, Member} from '../../models/members';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatCard, MatCardHeader} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-create-member',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatCheckbox,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatCardHeader,
    MatCard,
    MatSelect,
    MatOption,
    MatIcon
  ],
  standalone:true,
  templateUrl: './create-member.html',
  styleUrl: './create-member.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMember implements OnInit{
  form!: FormGroup;
  genderOptions = Object.entries(Gender);
  marriedStatus = Object.entries(MaritalStatus) ;

  constructor(
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<CreateMember>,
              @Inject(MAT_DIALOG_DATA) public data: { titre: string; membre?: Member }
  ) {  }

  ngOnInit(): void {
    const membre = this.data.membre;

    this.form = this.fb.group({
      id: [membre?.id],
      lastName: [membre?.lastName, Validators.required],
      firstName: [membre?.firstName, Validators.required],
      email: [membre?.email, [Validators.required, Validators.email]],
      birthDate: [membre?.birthDate],
      gender: [membre?.gender],
      phone: [membre?.phone],
      address: [membre?.address],
      idNumber: [membre?.idNumber],
      entryDate: [membre?.entryDate],
      maritalStatus: [membre?.maritalStatus],
      weddingDate: [membre?.weddingDate],
      weddingOfficiant: [membre?.weddingOfficiant],
      profession: [membre?.profession],
      baptismDate: [membre?.baptismDate],
      baptismOfficiant: [membre?.baptismOfficiant],
      childNumber: [membre?.childNumber],
      originChurch: [membre?.originChurch],
      consentToSharePersonalInfo: [membre?.consentToSharePersonalInfo],
      consentToUseImageInVisuals: [membre?.consentToUseImageInVisuals],
      idGroup: [membre?.idGroup],
      idResponsability: [membre?.idResponsability]
    });
  }

  save() {
    if (this.form.valid) {
      console.log('[DEBUG] Méthode save() appelée')
      const member: Member = this.form.value;
      this.dialogRef.close(member);  // envoie les données au parent via la fermeture du dialog
    }
  }


  close() {
    this.dialogRef.close();
  }

}

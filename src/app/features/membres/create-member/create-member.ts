import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Gender, Member} from '../../models/members';
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


@Component({
  selector: 'app-create-member',
  imports: [
    CommonModule,
    MatButton,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatCheckbox,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatCardHeader,
    MatCard,
    MatFormFieldModule,
    MatSelect,
    MatOption
  ],
  standalone:true,
  templateUrl: './create-member.html',
  styleUrl: './create-member.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMember {
  form: FormGroup;
  genderOptions = Object.entries(Gender);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateMember>,
    @Inject(MAT_DIALOG_DATA) public data: { titre: string }
  ) {
    this.form = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [null],
      gender: [''],
      phone: [''],
      address: [''],
      idNumber: [''],
      entryDate: [null],
      maritalStatus: [''],
      weddingDate: [null],
      weddingOfficiant: [''],
      profession: [''],
      baptismDate: [null],
      baptismOfficiant: [''],
      childNumber: [0],
      originChurch: [''],
      consentToSharePersonalInfo: [false],
      consentToUseImageInVisuals: [false],
      idGroup: [null],
      idResponsability: [null]
    });
  }

  save() {
    if (this.form.valid) {
      const member: Member = this.form.value;
      this.dialogRef.close(member);
    }
  }

  close() {
    this.dialogRef.close();
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatCardHeader} from '@angular/material/card';
import {Group} from '../../models/groupe';

@Component({
  selector: 'app-create-groupe',
  imports: [CommonModule, ReactiveFormsModule, MatDialogContent, MatCardHeader],
  standalone:true,
  templateUrl: './create-groupe.html',
  styleUrl: './create-groupe.scss'
})
export class CreateGroupe implements OnInit{

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<CreateGroupe>,
              @Inject(MAT_DIALOG_DATA) public data: { titre: string; group?: Group }
  )   { }

  ngOnInit(): void {
    const groupe = this.data.group;
  }



}

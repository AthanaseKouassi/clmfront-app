import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {Member} from '../../models/members';
import {DatePipe} from '@angular/common';
import {MemberService} from '../member-service';

@Component({
  selector: 'app-details',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatCheckbox,
    ReactiveFormsModule,
    MatCardContent,
    MatCardTitle,
    MatCard,
    DatePipe,
    MatCardHeader
  ],
  standalone:true,
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details implements OnInit{

  private readonly membreService = inject(MemberService);

  member: Member = {
    id: 0,
    lastName: '',
    firstName: '',
    email: '',
    birthDate: null,
    gender: '',
    address: '',
    phone: '',
    idNumber: '',
    baptismDate: null,
    baptismOfficiant: '',
    entryDate: null,
    maritalStatus: '',
    weddingDate: null,
    weddingOfficiant: '',
    childNumber: 0,
    originChurch: '',
    profession: '',
    idResponsability: null,
    idGroup: null,
    consentToSharePersonalInfo: false,
    consentToUseImageInVisuals: false
  };

  ngOnInit(): void {
  }




}

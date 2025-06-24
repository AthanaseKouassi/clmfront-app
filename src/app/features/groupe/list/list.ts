import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit {

  ngOnInit(): void {
  }


}

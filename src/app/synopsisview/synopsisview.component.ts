import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-synopsisview',
  templateUrl: './synopsisview.component.html',
  styleUrls: ['./synopsisview.component.scss']
})
export class Synopsisview implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {Description: string}) { }

  ngOnInit(): void {
  }

}

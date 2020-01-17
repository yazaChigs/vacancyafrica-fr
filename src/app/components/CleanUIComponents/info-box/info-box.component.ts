import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {

  @Input() extended = false;
  @Input() type = '';
  @Input() bigText: any;
  @Input() smallText: any;
  constructor() { }

  ngOnInit() {
  }

}

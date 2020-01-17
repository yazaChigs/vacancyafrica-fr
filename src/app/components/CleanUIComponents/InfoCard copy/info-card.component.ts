import { Component, OnInit, Input } from '@angular/core';
declare var require: any;
const data: any = require('./data.json');
@Component({
  selector: 'cui-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  @Input() form: string;
  @Input() icon: string;
  @Input() count: any;
  @Input() label: string;
  @Input() descr: string;
  @Input() link: string;
  @Input() type = '';
  @Input() btnType = 'default';
  iconClass: string;
  btnTypeClass: string;
  constructor() {}
  ngOnInit() {
    this.iconClass = 'icmn-' + this.icon;
    this.btnTypeClass = 'btn-outline-' + this.btnType;
  }
}

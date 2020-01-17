import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-link-box',
  templateUrl: './info-link-box.component.html',
  styleUrls: ['./info-link-box.component.scss']
})
export class InfoLinkBoxComponent implements OnInit {

  @Input() text: string;
  @Input() icon: string;
  @Input() styl: string;
  @Input() link: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigate() {
     this.router.navigate([this.link]);
  }
}

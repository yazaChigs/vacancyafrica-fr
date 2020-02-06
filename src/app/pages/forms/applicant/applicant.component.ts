import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/service/crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent implements OnInit {


  applicatant: any;
  applicatantArray: any[] = [];
  questionnare: any;
  questionnareArray: any[];
  id: any;

  constructor(private service: CrudService, private activatedRouter: ActivatedRoute,) {
    this.id = this.activatedRouter.snapshot.params.id;
   }

  ngOnInit() {
    this.getApplicantData()
  }

  getApplicantData() {
    this.service.getItem('/application/get-item/' + this.id).subscribe(
      result => {
        this.applicatant = result;
        if (this.applicatant !== null && this.applicatant !== undefined) {
          let array = Object.keys(this.applicatant.answers).map(k => this.applicatant.answers[k]);
          console.log(array)
          array.forEach(item => {
            if (item.constructor === String) { this.applicatantArray.push(item) }
            if (item.constructor === Array)  { this.applicatantArray.push(item) }
            if (item.constructor === Object)  {
              if ( item.key !== undefined && item.label !== undefined && item.weight !== undefined) {
                this.applicatantArray.push(item.label)
              } else {
                this.applicatantArray.push(Object.keys(item).join())
              }
            }
            if (item.constructor === Boolean)  { this.applicatantArray.push(item) }
            if (item.constructor === Number )  { this.applicatantArray.push(item) }
          })
          console.log(this.applicatantArray);
          this.getCreatedForm(this.applicatant)
        }
      },
       error => {
         console.log(error.error)
       },
    );
  }

  getCreatedForm(value) {
    this.service.getItem('/create-form/get/' + value.formName).subscribe(
      result => {
        this.questionnare = result;
        if (this.questionnare !== null && this.questionnare !== undefined) {
          this.questionnareArray = Object.keys(this.questionnare.questions).map(k => this.questionnare.questions[k].label);
          console.log(this.questionnareArray )
          }
        },
        error => {
          console.log(error.error)
        },

        );
      }

}

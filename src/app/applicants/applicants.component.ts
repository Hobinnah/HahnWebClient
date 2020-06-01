import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Alert, BreadCrumb, IApplicant } from '../models/models';
import { ApplicantService, MessageService, StorageService } from '../services/services';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';


function ageRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): {[key: string]: boolean} | null => {
      if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { 'range': true };
      }

      return null;
  };
}

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})


export class ApplicantsComponent implements OnInit {

  breadcrumb: Array<BreadCrumb>;
  alert: Alert;

  applicants: IApplicant[];
  applicantList: IApplicant[];
  applicant: IApplicant;

  pageSize = 10;
  page = 1;

  applicantForm: FormGroup;
  submitted = false;
  isViewRecord = false;

  constructor(private applicantService: ApplicantService, private storageService: StorageService, private formBuilder: FormBuilder,
              private loader: NgxUiLoaderService, private messageService: MessageService, private route: Router) {

      // The Pages Breadcrumb
      this.breadcrumb = [
          { Text: 'Home',  Link: '/home', Class: '', Params: null},
          { Text: 'Applicants',  Link: '/applicants', Class: 'active', Params: null}

      ];

      this.storageService.saveBreadCrumb(this.breadcrumb);


      // Applicant Initialization
      this.applicant = {
        id: 0,
        name: '',
        familyName: '',
        address: '',
        countryOfOrigin: '',
        age: 0,
        eMailAddress: '',
        hired: false
      };

  }

  ngOnInit() {

    this.loader.start();
    this.getAllApplicants();
    this.initializeForm();
  }

  getAllApplicants() {

      this.applicantService.getApplicants().subscribe(data => {

          const result: any = data;
          if (data) {
             this.applicants = result.result;
             this.applicantList = this.applicants;
          } else {
             this.applicants = [];
          }

          this.loader.stop();
          // console.log(data);
        },
        err => {  this.loader.stop(); });

  }

  initializeForm() {

    this.applicantForm = this.formBuilder.group({
          ID: new FormControl(''),
          Name: new FormControl('', [Validators.required, Validators.minLength(5)]),
          FamilyName: new FormControl('', [Validators.required, Validators.minLength(5)]),
          Address: new FormControl('', [Validators.required, Validators.minLength(10)]),
          CountryOfOrigin: new FormControl('', [Validators.required]),
          Age: new FormControl('', [ageRange(20, 60)]),
          EMailAddress: new FormControl('', [Validators.required, , Validators.email]),
          Hired: new FormControl(false)
    });

  }

  onSubmit() {

      this.submitted = true;

      // stop here if form is invalid
      if (this.applicantForm.invalid) {
           return;
      }

      this.loader.start();
      if (this.applicantForm.value.ID === '' || this.applicantForm.value.ID === 0 || this.applicantForm.value.ID === null) {

              this.applicant.id = 0;
              this.applicant.address = this.applicantForm.value.Address;
              this.applicant.age = parseInt(this.applicantForm.value.Age, 0);
              this.applicant.countryOfOrigin = this.applicantForm.value.CountryOfOrigin;
              this.applicant.eMailAddress = this.applicantForm.value.EMailAddress;
              this.applicant.familyName = this.applicantForm.value.FamilyName;
              this.applicant.name = this.applicantForm.value.Name;
              this.applicant.hired = this.applicantForm.value.Hired;
              // console.log('applicant', this.applicant);

              // Send new applicant data to server.
              this.applicantService.createApplicant(this.applicant).subscribe(data => {
                  if (data) {

                        this.getAllApplicants();
                        this.applicantForm.reset();

                        // Shows Alert Message ...
                        this.alert = this.messageService.ShowSuccessAlert('Applicant was successfully saved.');
                        this.messageService.sendAlertMessage(this.alert);
                        this.loader.stop();
                        alert('Applicant was successfully saved.');
                        this.route.navigateByUrl('confirmation');
                  } else {

                    this.loader.stop();
                    // Shows Alert Message ...
                    this.alert = this.messageService.ShowDangerAlert('An error occurred. Please provide valid values;');
                    this.messageService.sendAlertMessage(this.alert);
                  }
                  this.submitted = false;
                },
                err => {
                  this.loader.stop();
                  this.alert = this.messageService.ShowDangerAlert(`An error occurred. ${err}`);
                  this.messageService.sendAlertMessage(this.alert);
              });
      } else {
            // Send new applicant data to server.
              this.applicant.id = parseInt(this.applicantForm.value.ID, 0);
              this.applicant.address = this.applicantForm.value.Address;
              this.applicant.age = parseInt(this.applicantForm.value.Age, 0);
              this.applicant.countryOfOrigin = this.applicantForm.value.CountryOfOrigin;
              this.applicant.eMailAddress = this.applicantForm.value.EMailAddress;
              this.applicant.familyName = this.applicantForm.value.FamilyName;
              this.applicant.name = this.applicantForm.value.Name;
              this.applicant.hired = this.applicantForm.value.Hired;

                  // Update Applicant ...
              this.applicantService.updateApplicant(this.applicant.id, this.applicant).subscribe(data => {
                if (data) {
                      this.getAllApplicants();
                      this.applicantForm.reset();

                      // Shows Alert Message ...
                      this.alert = this.messageService.ShowSuccessAlert('Applicant was successfully updated.');
                      this.messageService.sendAlertMessage(this.alert);

                      this.loader.stop();
                      alert('Applicant was successfully saved.');
                      this.route.navigateByUrl('confirmation');
                } else {

                  this.loader.stop();
                  //   // Shows Alert Message ...
                  this.alert = this.messageService.ShowDangerAlert('An error occurred. Please provide valid values');
                  this.messageService.sendAlertMessage(this.alert);
                }
                this.submitted = false;
              },
              err => {
                  this.loader.stop();
                  this.alert = this.messageService.ShowDangerAlert(`An error occurred. ${err}`);
                  this.messageService.sendAlertMessage(this.alert);
              });
      }

      return false;
  }

  validateCountry(country) {

      this.loader.start();
      this.applicantService.validateCountry(country).subscribe(data => {

        const result = data;
        if (!data || result.responseCode !== '00') {
          this.resetCountry();
        }
        this.loader.stop();
      },
      err => { this.resetCountry(); this.loader.stop(); });
  }

  resetCountry() {

    this.applicantForm.patchValue({
      CountryOfOrigin: ''
    });

  }

  async filterApplicants(value) {

    this.applicants = await this.applicantService.filterApplicant(value, this.applicantList);
  }

  addApplicant() {

      // Resets the form.
      this.applicantForm.reset();
      this.submitted = false;
      this.isViewRecord = false;
  }

  onEditApplicant(applicant: IApplicant) {

      this.applicant = {
        id: 0,
        name: '',
        familyName: '',
        address: '',
        countryOfOrigin: '',
        age: 0,
        eMailAddress: '',
        hired: false
      };


      if (applicant) {

        this.isViewRecord = false;

        this.applicantForm.reset();
        this.applicantForm.patchValue({
            ID: applicant.id,
            Name: applicant.name,
            FamilyName: applicant.familyName,
            Address: applicant.address,
            CountryOfOrigin: applicant.countryOfOrigin,
            Age: applicant.age,
            EMailAddress: applicant.eMailAddress,
            Hired: applicant.hired
        });

      }

      return false;
  }

  onViewApplicant(applicant: any) {

      this.onEditApplicant(applicant);
      this.isViewRecord = true;

      return false;
  }

  onDeleteApplicant(applicant: IApplicant) {

      this.loader.start();
      if (applicant.id) {

        if (confirm('Are you sure you want to delete the ' + applicant.name + ' applicant')) {
              this.applicantService.deleteApplicant(applicant.id).subscribe(data => {
                if (data) {
                      this.getAllApplicants();

                      // Shows Alert Message ...
                      this.alert = this.messageService.ShowSuccessAlert('Applicant was successfully deleted.');
                      this.messageService.sendAlertMessage(this.alert);
                }
                this.loader.stop();
              },
              err => { this.loader.stop(); });
        } else {
           this.loader.stop();
        }
      }

      return false;
  }

  resetForm() {

      if (confirm('Are you sure you want to clear all data on the form?')) {

          this.applicantForm.reset();
      }

      return false;
  }

  onExportAsXLSX() {

    this.loader.start();
    if (this.applicants) {

        this.applicantService.onExportAsXLSX(this.applicants);
    }

    this.loader.stop();
    return false;
  }

}

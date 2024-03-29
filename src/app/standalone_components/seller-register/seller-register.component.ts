import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { RegisterLocationService } from './register-citystatecountry.service';
import { Country } from '../../common/model/country.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreService } from '../../services/store.service';
import { Store } from '../../common/store';
import { isPasswordMatch } from './password.matchFn';
import { autofocus } from '../../common/functions/control.focus';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-seller-register',
  standalone: true,
  imports: [
    MatFormField,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
  ],
  templateUrl: './seller-register.component.html',
  styleUrl: './seller-register.component.css',
})
export class SellerRegisterComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  constructor(
    private fb: FormBuilder,
    private locService: RegisterLocationService,
    private storeService: StoreService
  ) {
    this.countries = this.locService.getCountries();
  }
  ngOnInit(): void {
    this.country.valueChanges.subscribe((country) => {
      this.state.reset();
      this.state.disable();
      console.log(country);
      if (country) {
        this.states = this.locService.getStatesByCountry(country);
        this.state.enable();
      }
    });

    this.state.valueChanges.subscribe((state) => {
      this.city.reset();
      this.city.disable();
      if (state) {
        this.cities = this.locService.getCitiesByState(
          this.country.value,
          state
        );
        this.city.enable();
      }
    });
  }

  countries: Country[];
  states: string[];
  cities: string[];

  country = new FormControl('', [Validators.required]);
  state = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(45),
  ]);
  addressLine1 = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(64),
  ]);
  addressLine2 = new FormControl('', [
    Validators.minLength(10),
    Validators.maxLength(64),
  ]);
  postalCode = new FormControl('', [
    Validators.minLength(5),
    Validators.maxLength(10),
  ]);
  firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(45),
  ]);
  lastName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(45),
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(15),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(15),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(15),
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);

  vendorRegistrationForm = this.fb.group({
    id: [0],
    name: this.name,
    addressLine1: this.addressLine1,
    addressLine2: this.addressLine2,
    city: this.city,
    state: this.state,
    country: this.country,
    postalCode: this.postalCode,
    firstName: this.firstName,
    lastName: this.lastName,

    phoneNumber: this.phoneNumber,

    email: this.email,
    password: this.password,
  });

  vendorRegister(vendorRegistrationForm) {
    console.log(vendorRegistrationForm.value);

    if (!isPasswordMatch(this.password, this.confirmPassword)) {
      alert('Password and Confirm Password Your entered are different.');
      autofocus('password');
      return;
    }
    console.log(vendorRegistrationForm.value.email);
    this.storeService
      .isEmailUnique(vendorRegistrationForm.value.email)
      .subscribe({
        next: (data: boolean) => {
          console.log(data);
          if (data === false) {
            alert(
              'The same email address is already registered. You need to choose another one.'
            );
            autofocus('email');
            return;
          } else {
            this.storeService
              .registerStore(vendorRegistrationForm.value)
              .subscribe({
                next: (data: Store) => {
                  console.log(data);
                },
                error: (e) => console.error(e),
                complete: () => console.info('complete'),
              });
          }
        },
      });
  }
}

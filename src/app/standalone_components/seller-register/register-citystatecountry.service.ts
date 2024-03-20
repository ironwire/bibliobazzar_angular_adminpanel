import * as countrycitystatejson from 'countrycitystatejson';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class RegisterLocationService {
  private countryData = countrycitystatejson;

  getCountries() {
    return this.countryData.getCountries();
  }

  getStatesByCountry(countryShortName: string) {
    return this.countryData.getStatesByShort(countryShortName);
  }

  getCitiesByState(country: string, state: string) {
    return this.countryData.getCities(country, state);
  }
}

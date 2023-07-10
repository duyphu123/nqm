import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  bsValue = new Date();

  maxDate = new Date();

  selectedProvince?: string;
  selectedDistrict?: string;
  selectedWard?: string;
  provinces?: any[];
  districts?: any[];
  wards?: any[];
  result?: string;

  constructor(private http: HttpClient) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
   
  }
  ngOnInit() {
    this.loadProvinces();
    this.selectedProvince = '';
    this.selectedDistrict = '';
    this.selectedWard = '';
  }

  loadProvinces() {
    this.http
      .get<any[]>('https://provinces.open-api.vn/api/')
      .subscribe((response) => {
        this.provinces = response;
      });
  }

  loadDistricts() {
    if (this.selectedProvince) {
      this.http
        .get<any>(
          'https://provinces.open-api.vn/api/p/' +
            this.selectedProvince +
            '?depth=2'
        )
        .subscribe((response) => {
          this.districts = response.districts;
        });
    } else {
      this.districts = [];
    }
    this.selectedDistrict = '';
    this.selectedWard = '';
    this.result = '';
  }

  loadWards() {
    if (this.selectedDistrict) {
      this.http
        .get<any>(
          'https://provinces.open-api.vn/api/d/' +
            this.selectedDistrict +
            '?depth=2'
        )
        .subscribe((response) => {
          this.wards = response.wards;
        });
    } else {
      this.wards = [];
    }
    this.selectedWard = '';
    this.result = '';
  }

  updateResult() {
    if (this.selectedProvince && this.selectedDistrict && this.selectedWard) {
      this.result = `${this.selectedProvince} | ${this.selectedDistrict} | ${this.selectedWard}`;
    }
  }
}

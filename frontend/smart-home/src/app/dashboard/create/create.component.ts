import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/http-service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  tempForm = new FormGroup({
    name: new FormControl(''),
    temp: new FormControl(''),
    status: new FormControl(''),
  }); 

  generalForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl('')
  }); 

  constructor(private http : HttpService) { }

  ngOnInit(): void {

  }

  async submitLogin(){
    console.log(this.generalForm);

    await this.http.createNewGeneralDevice(this.generalForm.get("name").value, this.generalForm.get("status").value);
  }

  async submitLoginTemp(){
    console.log(this.tempForm);
    this.http.createNewTempDevice(this.tempForm.get("name").value, this.tempForm.get("status").value, this.tempForm.get("temp").value)
  }

}

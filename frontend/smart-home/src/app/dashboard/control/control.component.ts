import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpService } from 'src/app/http-service';
import {ListControl} from './list-control';
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  onOffList : Array<ListControl>;
  tempList : Array<ListControl>;
  addInput = new FormControl('');

  constructor(private http : HttpService) { }

  ngOnInit(): void {
    this.tempList = new Array<ListControl>();
    this.onOffList = new Array<ListControl>();
    this.getData();
  }

  changeTemp(op : string, id : string){
    let idx = this.tempList.findIndex(x => x.id == id);
    if(op == "+"){
      this.tempList[idx].temp++;
    }else{
      this.tempList[idx].temp--;
    }
  }

  changeTempStatus(id : string){
    let idx = this.tempList.findIndex(x => x.id == id);
    if(this.tempList[idx].status){
      this.tempList[idx].status = false;
    }else{
      this.tempList[idx].status = true;
    }
  }

  changeOnOffStatus(id : string){
    let idx = this.onOffList.findIndex(x => x.id == id);
    if(this.onOffList[idx].status){
      this.onOffList[idx].status = false;
    }else{
      this.onOffList[idx].status = true;
    }
  }

  async applyChanges(type : string, id : string){
    if(type == "t"){
      let changeObject = this.tempList.find(x => x.id == id);
      console.log(changeObject);
      await this.http.updateTempDevice(changeObject.name, changeObject.status, changeObject.temp, changeObject.id);
    }else{
      let changeObject = this.onOffList.find(x => x.id == id);
      console.log(changeObject);
      await this.http.updateGeneralDevice(changeObject.name, changeObject.status, changeObject.id);
    }
  }

  async getData(){
    var temp = await this.http.getAllTempDevices().catch(error => {
      console.error("error GET all temp devices");
    });

    var general = await this.http.getAllGeneralDevices().catch(error => {
      console.error("error GET all general devices");
    });
    console.log(temp);
    console.log(general);
    this.tempList = temp.devices;
    this.onOffList = general.devices;
  }

}

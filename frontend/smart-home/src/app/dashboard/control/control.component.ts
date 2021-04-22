import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  constructor() { }

  ngOnInit(): void {

    this.tempList = new Array<ListControl>();
    let listD = new ListControl();
    listD.name = "Tmp";
    listD.status = false;
    listD.temp = 24;
    listD.id = 1;

    let listE = new ListControl();
    listE.name = "Tmp";
    listE.status = true;
    listE.temp = 200;
    listE.id = 2;


    let listF = new ListControl();
    listF.name = "Tmp";
    listF.status = true;
    listF.temp = 37;
    listF.id = 3;

    this.tempList.push(listD);
    this.tempList.push(listE);
    this.tempList.push(listF);

    this.onOffList = new Array<ListControl>();
    let listG = new ListControl();
    listG.name = "Tmp";
    listG.status = true;
    listG.id = 4;

    let listH = new ListControl();
    listH.name = "Tmp";
    listH.status = false;
    listH.id = 5;


    let listI = new ListControl();
    listI.name = "Tmp";
    listI.status = true;
    listI.id = 6;

    this.onOffList.push(listG);
    this.onOffList.push(listH);
    this.onOffList.push(listI);

    //this.getData();
  }

  changeTemp(op : string, id : number){
    let idx = this.tempList.findIndex(x => x.id == id);
    if(op == "+"){
      this.tempList[idx].temp++;
    }else{
      this.tempList[idx].temp--;
    }
  }

  changeTempStatus(id : number){
    let idx = this.tempList.findIndex(x => x.id == id);
    if(this.tempList[idx].status){
      this.tempList[idx].status = false;
    }else{
      this.tempList[idx].status = true;
    }
  }

  changeOnOffStatus(id : number){
    let idx = this.onOffList.findIndex(x => x.id == id);
    if(this.onOffList[idx].status){
      this.onOffList[idx].status = false;
    }else{
      this.onOffList[idx].status = true;
    }
  }

  applyChanges(type : string, id : number){
    if(type == "t"){
      let changeObject = this.tempList.find(x => x.id == id);
      console.log(changeObject);
      //api call
    }else{
      let changeObject = this.onOffList.find(x => x.id == id);
      console.log(changeObject);
      //api call
    }
  }

}

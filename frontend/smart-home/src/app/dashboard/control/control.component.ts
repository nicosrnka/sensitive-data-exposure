import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {ListControl} from './list-control';
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  heaterHeat : number;
  bathTubHeat : number;
  bathTubStatus : boolean;
  ovenHeat : number;
  ovenStatus : boolean;
  controlList : Array<ListControl>;

  addInput = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.heaterHeat = 30;
    this.bathTubStatus = false;
    this.bathTubHeat = 36;
    this.ovenStatus = true;
    this.ovenHeat = 200;
    this.controlList = new Array<ListControl>();
    let listA = new ListControl();
    listA.name = "Living room light";
    listA.status = false;

    let listB = new ListControl();
    listB.name = "Garage door";
    listB.status = false;

    let listC = new ListControl();
    listC.name = "Living room window";
    listC.status = false;

    this.controlList.push(listA);
    this.controlList.push(listB);
    this.controlList.push(listC);
  }

  changeHeat(op : string){
    if(op == "+"){
      if(this.heaterHeat + 1 <= 30){
        this.heaterHeat++;
      }
    }else{
      if(this.heaterHeat - 1 >= 10){
        this.heaterHeat--;
      }
    }
  }

  changeBathTubHeat(op : string){
    if(op == "+"){
      if(this.bathTubHeat + 1 <= 50){
        this.bathTubHeat++;
      }
    }else{
      if(this.bathTubHeat - 1 >= 15){
        this.bathTubHeat--;
      }
    }
  }

  changeBathTubeStatus(){
    if(this.bathTubStatus){
      this.bathTubStatus = false;
    }else{
      this.bathTubStatus = true;
    }
  }

  changeOvenStatus(){
    if(this.ovenStatus){
      this.ovenStatus = false;
    }else{
      this.ovenStatus = true;
    }
  }

  changeOvenHeat(op : string){
    if(op == "+"){
      if(this.ovenHeat + 1 <= 280){
        this.ovenHeat++;
      }
    }else{
      if(this.ovenHeat - 1 >= 50){
        this.ovenHeat--;
      }
    }
  }

  addCustomControl(){
    
    let con = new ListControl();
    console.log(this.addInput);
    con.name = this.addInput.value;
    console.log("hier");
    con.status = false;
    this.controlList.push(con);
    this.addInput.setValue("");
  }

}

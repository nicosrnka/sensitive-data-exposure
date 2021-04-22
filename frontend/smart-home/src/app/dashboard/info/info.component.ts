import { Component, OnInit } from '@angular/core';
import { ListControl } from '../control/list-control';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  onOffList : Array<ListControl>;
  tempList : Array<ListControl>;
  
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

}

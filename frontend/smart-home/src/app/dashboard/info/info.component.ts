import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http-service';
import { ListControl } from '../control/list-control';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  onOffList : Array<ListControl>;
  tempList : Array<ListControl>;
  
  constructor(private http : HttpService) { }

  ngOnInit(): void {
    this.tempList = new Array<ListControl>();
    this.onOffList = new Array<ListControl>();
    this.getData();
  }

  async getData(){
    var temp = await this.http.getAllTempDevices().catch(error => {
      console.error("error GET all temp devices");
    });

    var general = await this.http.getAllGeneralDevices().catch(error => {
      console.error("error GET all general devices");
    });

    this.tempList = temp.devices;
    this.onOffList = general.devices;
  }

}

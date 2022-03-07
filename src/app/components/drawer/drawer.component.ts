import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from "@angular/material/sidenav";
import { faChartBar } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {

  @ViewChild(MatDrawer) drawer!: MatDrawer;
  faChartBar = faChartBar;

  constructor() {
    //Vide
  }

  public toggleDrawer(): void {
    this.drawer.toggle();
  }

}

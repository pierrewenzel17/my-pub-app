import { Component, Input } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { DrawerComponent } from '../drawer/drawer.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() drawer!: DrawerComponent;
  faGithub = faGithub;

}

import { Component, Input } from '@angular/core';
import { Beer } from 'app/models/beer';
import { faBeer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent {

  @Input() beer!: Beer

  faBeer = faBeer;

  constructor() {
    // vide
  }

}

import { Component, OnInit, Output } from '@angular/core';
import { Beer } from 'app/models/beer';
import { BeerService } from 'app/services/beer-service/beer.service';
import { faBeer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  @Output()
  beers: Beer[] = [];
  faBeer = faBeer;
  search: string = "";

  constructor(private readonly beerService: BeerService){}

  ngOnInit(): void {
    this.beerService.fetch().subscribe((beers) => {
      this.beers = beers || [];
    });
  }

  submit() {
    this.beerService.fetchSearch(this.search).subscribe((beers) => {
      this.beers = beers || [];
    });
  }

}

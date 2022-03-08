import { Component, OnInit } from '@angular/core';
import { Beer } from 'app/models/beer';
import { BeerService } from 'app/services/beer-service/beer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  beers: Observable<Beer[]>;

  constructor(private readonly beerService : BeerService){
    this.beers = beerService.fetch();
  }

  ngOnInit(): void {
    /*this.beerService.fetch().subscribe((beers) => {
      this.beers = beers || [];
    });*/
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Beer } from 'app/models/beer';
import { BeerService } from 'app/services/beer-service/beer.service';

@Component({
  selector: 'edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {

  beer!: Beer;

  /**
   * Component constructor
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly musiqueService: BeerService
  ) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.route.data.subscribe((beer: any) => (this.beer = beer.beer));
  }

  submit(beer: any) {
    this.musiqueService.update(beer).subscribe(() => {
      this.router.navigate(['/tableau']).then(r => null);
    });
  }

  cancel() {
    this.router.navigate(['/tableau']).then(r => null);
  }
}

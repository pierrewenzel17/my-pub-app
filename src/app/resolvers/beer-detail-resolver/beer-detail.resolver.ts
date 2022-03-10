import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Beer } from 'app/models/beer';
import { BeerService } from 'app/services/beer-service/beer.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerDetailResolver implements Resolve<Beer> {

  constructor(private readonly beerService: BeerService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Beer> {
    const beerId: string | null = route.paramMap.get('id');
    if(beerId != null){
      return this.beerService.fetchOne(beerId);
    }
    else
      return new Observable<Beer>();
  }
}

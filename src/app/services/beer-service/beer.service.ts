import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import { Beer } from 'app/models/beer';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  private beers = new BehaviorSubject<string>('');

  private urlServer:any = {};

  constructor(private readonly http: HttpClient) {

    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(
      // @ts-ignore
      k => (this.urlServer[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
    console.log(this.urlServer);
  }

  get beers$(): Observable<string> {
    return this.beers.asObservable();
  }

  updatedMusicList(data: string){
    this.beers.next(data);
  }

  fetch(): Observable<Beer[]> {
    return this.http.get<Beer[]>("http://localhost:5001/api/beer");
  }

  fetchOne(id: string): Observable<Beer> {
    return this.http.get<Beer>(this.urlServer.uneBiere.replace(':id', id));
  }

  create(biere: Beer): Observable<Beer> {
    return this.http.post<Beer>(this.urlServer.toutesLesBieres, biere);
  }

  update(biere: Beer): Observable<Beer> {
    return this.http.put<Beer>(this.urlServer.uneBiere.replace(':id', biere.id), biere);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.urlServer.uneBiere.replace(':id', id));
  }
}

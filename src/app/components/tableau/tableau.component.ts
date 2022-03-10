import { Component, OnInit, ViewChild, AfterViewInit, Input, Output } from '@angular/core';
import { Beer } from 'app/models/beer';
import { BeerService } from 'app/services/beer-service/beer.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faBeer, faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { getPaginatorRename } from './paginator-rename';
import { mergeMap, Observable, ReplaySubject, startWith, tap } from 'rxjs';
import { PopUpComponent } from '../pop-up/pop-up.component';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPaginatorRename() }
  ]
})
export class TableauComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private addDialog: MatDialogRef<PopUpComponent> | any;

  beers: Beer[] = [];
  @Output()
  beerLength!: number
  faBeer = faBeer; faPlus = faPlus; faDelete = faTrash; faUpdate = faPen;
  expandedElement!: Beer | null;
  public dataSource!: BeerDataSource
  displayedColumns: string[] = [
    'index',
    'name',
    'country',
    'type',
    'categories',
    'degree',
    'bottle'
  ];

  dialogStatus: string = "inactive";

  constructor(private readonly beerService : BeerService, public dialog: MatDialog){
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(startWith(null), tap(() => {
      this.beerService.fetchPageBeer(this.paginator.pageSize, this.paginator.pageIndex).subscribe((beers) => {
        this.beers = beers;
        this.dataSource = new BeerDataSource(this.beers);
      })})).subscribe();
  }

  ngOnInit(): void {
    this.beerService.fetch().subscribe((beers) => {
      this.beerLength = beers.length;
    })
  }

  showDialog() {
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(PopUpComponent, {
      width: '600px',
      data: {}
    });

    this.addDialog.afterClosed().subscribe((beer:any)=> {
      this.dialogStatus = 'inactive';
      if (beer) {
        this.add(beer);
      }
    });
  }

  add(beer: Beer) {
    this.beerService
      .create(beer)
      .pipe(mergeMap(() => this.beerService.fetch()))
      .subscribe(beers => {
        this.beerLength = beers.length;
      });
    this.beerService.fetchPageBeer(this.paginator.pageSize, this.paginator.pageIndex).subscribe(beers => {
        this.beers = beers;
        this.dataSource.setData(this.beers);
        this.hideDialog();
    });
  }

  update(beer: Beer) {
    this.beerService
      .update(beer)
      .pipe(mergeMap(() => this.beerService.fetchPageBeer(this.paginator.pageSize, this.paginator.pageIndex)))
      .subscribe(beers => {
        this.beers = beers;
        this.dataSource.setData(this.beers);
        this.hideDialog();
      });
  }

  delete(beer: Beer) {
    if(beer.id !== undefined) {
    this.beerService
      .delete(beer.id)
      .pipe(mergeMap(() => this.beerService.fetch()))
      .subscribe((beers) => {
        this.beerLength = beers.length;
        this.beerService.fetchPageBeer(this.paginator.pageSize, this.paginator.pageIndex).subscribe(beers => {
          this.beers = beers;
          this.dataSource.setData(this.beers);
        })
    });
   

    }
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    if(this.addDialog != undefined){
      this.addDialog.close();
    }
  }
}

class BeerDataSource extends DataSource<Beer> {
  private _dataStream = new ReplaySubject<Beer[]>();

  constructor(initialData: Beer[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Beer[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Beer[]) {
    this._dataStream.next(data);
  }
}
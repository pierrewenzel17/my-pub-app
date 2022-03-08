import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Beer } from 'app/models/beer';
import { BeerService } from 'app/services/beer-service/beer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faBeer } from '@fortawesome/free-solid-svg-icons';

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
})
export class TableauComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  beers: Beer[] = [];
  faBeer = faBeer;
  expandedElement!: Beer | null;
  public dataSource = new MatTableDataSource<Beer>();
  displayedColumns: string[] = [
    'name',
    'country',
    'type',
    'categories',
    'degree',
    'bottle'
  ];

  constructor(private readonly beerService : BeerService){}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.beerService.fetch().subscribe((beers) => {
      this.beers = beers;
      this.dataSource = new MatTableDataSource(this.beers);
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { Beer } from 'app/models/beer';
import { BeerService } from 'app/services/beer-service/beer.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {

  beers: Beer[] = [];
  public dataSource = new MatTableDataSource<Beer>();
  displayedColumns: string[] = [
    'Nom',
    'Pays',
    'Type',
    'Categorie',
    'Degré',
    'Volumetrie',
    'Description'
  ];

  constructor(private readonly beerService : BeerService){}

  ngOnInit(): void {
    this.beerService.fetch().subscribe((beers) => {
      this.beers = beers || [];
    });
    this.dataSource = new MatTableDataSource(this.beers);
  }
}


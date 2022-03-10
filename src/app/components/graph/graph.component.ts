import { Component, OnInit } from '@angular/core';
import { ThemeOption } from "ngx-echarts";
import { EChartsOption, EChartsType } from "echarts";
import { BeerService } from 'app/services/beer-service/beer.service';
import { Beer } from 'app/models/beer';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  theme!: ThemeOption

  chartC!: EChartsType
  chartT!: EChartsType
  chartCateg!: EChartsType

  chartOptionCountry: EChartsOption = {
    title: {
      text: 'Nombre de bière par pays',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false
    }
  };

  chartOptionType: EChartsOption = {
    title: {
      text: 'Nombre de bière par types',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false
    }
  };

  chartOptionCateg: EChartsOption = {};

  listBeer: Array<Beer> = [];

  constructor(private service: BeerService) {
    this.service.fetch().forEach(beers => this.listBeer.push(...beers))
  }
  ngOnInit(): void {
    this.onChartCountryInit(this.chartC)
    this.onChartTypeInit(this.chartT)
    this.onChartCategInit(this.chartCateg)
  }


  private chooseChartData(data: Map<string, any>, dataChoose: string): void {
    if (data.get(dataChoose) == undefined)
      data.set(dataChoose, { value: 1, name: dataChoose })
    else
      data.get(dataChoose).value++
  }

  onChartCountryInit(myChart: EChartsType) {
    this.chartC = myChart;
    let data: Map<string, any> = new Map();
    this.listBeer.forEach((beer: Beer) => {
      if(beer.country !== undefined)
        this.chooseChartData(data, beer.country);
    });
    let valeurs = Array.from(data.values());
    this.chartOptionCountry.series = [
      {
        name: 'Nombre de bière par pays',
        type: 'pie',
        radius: '50%',
        data: valeurs,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
    this.chartC.setOption(this.chartOptionCountry);
  }

  onChartTypeInit(myChart: EChartsType) {
    this.chartT = myChart
    let data: Map<string, any> = new Map();
    this.listBeer.forEach((beer: Beer) => {
      if(beer.type !== undefined)
        this.chooseChartData(data, beer.type);
    });
    let valeurs = Array.from(data.values());
    this.chartOptionType.series = [
      {
        name: 'Nombre de bière par types',
        type: 'pie',
        radius: '50%',
        data: valeurs,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
    this.chartT.setOption(this.chartOptionType);
  }

  onChartCategInit(myChart: EChartsType) {
    this.chartCateg = this.chartCateg
    let data: Map<string, any> = new Map();
    this.listBeer.forEach((beer: Beer) => {
      if(beer.categories !== undefined)
        this.chooseChartData(data, beer.categories);
    });
    let axe: string[] = []
    let val: number[] = []
    data.forEach(v => {
      axe.push(v.name);
      val.push(v.value);
    })
    this.chartOptionCateg = {
      xAxis: {
        type: 'category',
        data: axe
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: val,
          type: 'bar'
        }
      ]
    }
    myChart.setOption(this.chartOptionCateg);
  }
}

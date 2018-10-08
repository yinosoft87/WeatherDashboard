import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js'
import { IDayTemperature } from './IDayTemperature';
import { WDashboardService } from './w-dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { Decimal } from "decimal.js"

@Component({
  selector: 'app-w-dashboard',
  templateUrl: './w-dashboard.component.html',
  styleUrls: ['./w-dashboard.component.css']
})

export class WDashboardComponent implements OnInit {
  @ViewChild('donut') donut: ElementRef;
  chart = Chart;
  public DayTemperatures: IDayTemperature;
  public cityName: string;

  canvas: any;
  ctx: any;

  dayText: string[];
  tempNums: number[];


  constructor(private DashBoardService: WDashboardService, private router: Router,
    private activateRoute: ActivatedRoute) {

    this.DashBoardService.GetListTemperatures("CdObregon")
      .subscribe(temps => {

        this.dayText = ['sep 1', 'sep 2', 'sep 3', 'sep 4', 'sep 5', 'sep 6', 'sep 7', 'sep 8', 'sep 8', 'sep 10', 'sep 11', 'sep 12', 'sep 13', 'sep 14', 'sep 15'];
        this.tempNums = [25.5, 25, 26, 27, 26.1, 25.6, 24, 26.0, 28, 29, 29, 28, 30, 28, 28];

        this.LoadChartGraph("Temperatures", this.dayText, this.tempNums);
        this.chart.render();

        this.DayTemperatures = temps;
        error => console.error(error)
      });
  }

  ngOnInit() {

    this.activateRoute.params.subscribe(param => {
      if (param["name"] == undefined) {
        return;
      }

      this.DashBoardService.GetListTemperatures(param["name"])
        .subscribe(temps => {
          this.chart.data.datasets = temps.temperatures;
          this.chart.data.labels = temps.dates;
          this.chart.update();
          this.chart.render();

          this.DayTemperatures = temps;
          error => console.error(error)
        });

      this.cityName = param["name"];
    });
  }

  public LoadChartGraph(Title: string, dates: string[], temperatures: number[]) {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: Title,
          data: temperatures,
          backgroundColor: [
            'rgba(59, 122, 184, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });
  }

}



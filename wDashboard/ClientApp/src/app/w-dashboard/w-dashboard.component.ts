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
  public chart = Chart;
  public DayTemperatures: IDayTemperature;
  public cityName: string;

  canvas: any;
  ctx: any;

  constructor(private DashBoardService: WDashboardService, private router: Router,
    private activateRoute: ActivatedRoute) {

    this.DashBoardService.GetListTemperatures("CdObregon")
      .subscribe(temps => {
        this.cityName = "CdObregon";
        this.DayTemperatures = temps;
        this.LoadChartGraph('Temperatures', temps.date, temps.temperature);
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
          this.DayTemperatures = temps;
          this.LoadChartGraph('Temperatures', temps.date, temps.temperature);
          error => console.error(error)
        });
      this.cityName = param["name"];
    });
  }

  public LoadChartGraph(Title: string, labe: string[], num: number[]) {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: labe,
        datasets: [{
          label: Title,
          data: num,
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



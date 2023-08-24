import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['January', 'February', 'March', 'April',
          'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',],
        datasets: [
          {
            label: "Leads",
            data: ['130', '100', '124', '90', '180',
              '75', '99', '195', '162', '250', '110', '145'],
            backgroundColor: '#3f51b5'
          },
          {
            label: "Sales",
            data: ['50', '60', '74', '25', '132',
              '20', '69', '147', '117', '200', '80', '103'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
}

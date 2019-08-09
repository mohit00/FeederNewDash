import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {MultiDataSet, Label } from 'ng2-charts';
import { Service } from '../app.service';

@Component({
  selector: 'app-dash2',
  templateUrl: './dash2.component.html',
  styleUrls: ['./dash2.component.scss']
})
export class Dash2Component implements OnInit {
  chartClicked1(event){
    this.title = 'UP Feeder'
    this.flip = 'tablemainToremove'
    this.flip1 = 'tableShow';

    this.expanddiv(2);
  }
  back(){
    this.title = 'PVVNL Device Status'
    this.flip = ''
    this.flip1 = 'tableToShow';
  
    this.removediv(2);

  }
  flip1:any = 'tableToShow';
  flip:any = '';

  title : any = 'PVVNL Device Status';  
  lat: number = 51.678418;
  lng: number = 7.809007;
  div1:any  = '';
  expand:boolean = true;
  div2:any= '';
  div3:any='';
  div4:any='';
  div5:any='';
  div6:any='';
   public barChartOptions1: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels1: Label[] = ['PVVNL', 'MVVNL', 'DVVNL', 'KESCo', 'PuVVNL'];
  public barChartType1: ChartType = 'bar';
  public barChartLegend1 = true;
  public barChartPlugins1 = [pluginDataLabels];

  public barChartData1: ChartDataSets[] = [
    { data: [29459496.5/10000, 21368740/10000, 23333744 /10000, 241059.5 /10000, 28003105/10000], label: 'Total Cost' },
    { data: [4566.529, 3253.436	, 3586.924	, 36.839	, 4148.626	], label: 'Unit' }
  ];



  public barChartOptions: ChartOptions = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: { xAxes: [{}], yAxes: [{}] },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
};
public barChartLabels: Label[] = ['PVVNL', 'MVVNL', 'DVVNL', 'KESCo', 'PuVVNL'];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [pluginDataLabels];

public barChartData: ChartDataSets[] = [
  { data: [874, 972, 709, 31, 411], label: 'Total Installed Device' , "backgroundColor":[  
    "#ffbaba",
    "#baffba",
    "#babaff",
    "#baffff",
    "rgba(54, 162, 235, 0.3)",
    "rgba(153, 102, 255, 0.3)",
    "rgba(201, 203, 207, 0.3)"
 ]},
 ];
 public doughnutChartLabels: Label[] = ['Feeder > 22', 'Feeder < 22'];
 public doughnutChartData: MultiDataSet = [
   [465 - 127 ,127],
  ];
 public doughnutChartType: ChartType = 'doughnut';


 public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'right',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = "";
        return label;
      },
    },
  }
};
public pieChartLabels: Label[] = [['UP'], [ 'OUTAGE'], ['NOT CONNECTING'],['NOT IN SERVICE']];
public pieChartData: number[] = [749, 58, 62,4];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [pluginDataLabels];
public pieChartColors = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,255,255,0.3)'],
  },
];

constructor(private Service:Service) { }

ngOnInit() {
}

// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public randomize(): void {
  // Only Change 3 values
  const data = [
    Math.round(Math.random() * 100),
    59,
    80,
    (Math.random() * 100),
    56,
    (Math.random() * 100),
    40];
  this.barChartData[0].data = data;
}
expanddiv(data){
  this.expand = false;

  this.Service.fullScreen.emit(true);
   if(data == 1){
     this.div1 = 'divDash1';
  }else if(data == 2){
    this.div2 = 'divDash2';
  }else if(data == 3){
  this.div3 = 'divDash3';
  }else if(data == 4){
    this.div4 = 'divDash4'
  }else if(data == 5){
    this.div5 = 'divDash5'

  }else if(data == 6){
    this.div6 = 'divDash6'

  }
}

removediv(data){
  this.expand = true;
  this.Service.fullScreen.emit(false);

  if(data == 1){
    this.div1 = '';
 }else if(data == 2){
   this.div2 = '';
 }else if(data == 3){
 this.div3 = '';
 }else if(data == 4){
   this.div4 = ''
 }else if(data == 5){
  this.div5 = ''

}else if(data == 6){
  this.div6 = ''

}
}
}
 
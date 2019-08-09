import { Component ,OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Service } from '../app.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
 
export class DashComponent {
  
  div1:any  = '';
  expand:boolean = true;
  div2:any= '';
  div3:any='';
  div4:any='';
  flip:any = '';
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 2, rows: 1 },
        { title: 'Card 3', cols: 2, rows: 1 },
        { title: 'Card 4', cols: 2, rows: 1 }
      ];
    })
  );
  showFiller = true;
  flip1:any = 'tableToShow';
  flip3:any = 'tableToShow';
  flip5:any='tableToShow';
  lat: number = 51.678418;
  lng: number = 7.809007;
  typedash:any = "Graphical"
  title :any = ' FEEDER STATUS AND POWER FACTOR @ 15:53:39';
  constructor(private breakpointObserver: BreakpointObserver,private Service:Service) {
    setTimeout(()=>{

    },2000)
   }
   chartData:any ;
   generateData() {
    this.chartData = [
      {State:'AL',freq:{low:4786, mid:1319, high:249}}
      ,{State:'AZ',freq:{low:1101, mid:412, high:674}}
      ,{State:'CT',freq:{low:932, mid:2149, high:418}}
      ,{State:'DE',freq:{low:832, mid:1152, high:1862}}
      ,{State:'FL',freq:{low:4481, mid:3304, high:948}}
      ,{State:'GA',freq:{low:1619, mid:167, high:1063}}
      ,{State:'IA',freq:{low:1819, mid:247, high:1203}}
      ,{State:'IL',freq:{low:4498, mid:3852, high:942}}
      ,{State:'IN',freq:{low:797, mid:1849, high:1534}}
      ,{State:'KS',freq:{low:162, mid:379, high:471}}
      ];
   //   for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
  //   this.chartData.push({
  //     letter: `Index ${i}`,
  //     frequency: Math.floor(Math.random() * 100)
  //   }
  //   );
  //  }
  }
   changeDash(){
     if(this.typedash == "Graphical"){
       this.generateData();
       this.typedash = "Tabular";
     }else{
       this.typedash = "Graphical";
     }
   }
showDa(){
      this.flip = 'tablemainToremove'
      this.flip1 = 'tableShow';
      this.title = "UP Feeder"
}
back(){
  this.flip = ''
  this.flip1 = 'tableToShow';
  this.title = "FEEDER STATUS AND POWER FACTOR @ 15:53:39"
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
   }
  }
}

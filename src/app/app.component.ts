import { Component ,ViewChild} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Service } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer',{static: false}) public myNav: MatDrawer;


  title = 'feeder';
 showNotFullScreen:boolean = true;
  constructor(private Service:Service){
    this.Service.fullScreen.subscribe(res=>{
      if(res == true){
        this.showNotFullScreen = false;

      }else{
        this.showNotFullScreen = true;

      }
    })
    this.Service.checksite.subscribe(res=>{
     
     this.test();

    })
  }
  test(){
     setTimeout(()=>{
      this.myNav.toggle();

    },100)

  }
  
}

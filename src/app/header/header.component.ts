import { Component, OnInit } from '@angular/core';
import { Service } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private Service:Service) { 
    this.Service.checksite.emit(true);

  }
toggle(){
 
  this.Service.checksite.emit(true);
}
  ngOnInit() {
  }

}

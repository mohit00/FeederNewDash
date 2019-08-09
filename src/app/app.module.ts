import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgmCoreModule } from '@agm/core';
import { BarchartComponent } from './barchart/barchart.component';
import { Barchart2Component } from './barchart2/barchart2.component';
import { Dash2Component } from './dash2/dash2.component';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashComponent,
    BarchartComponent,
    Barchart2Component,
    Dash2Component
  ],
  imports: [ChartsModule, NgCircleProgressModule.forRoot(),
    
   
  
    BrowserAnimationsModule,MatSidenavModule,MatNativeDateModule,
    AppRoutingModule,MatInputModule,MatDatepickerModule,
    MatGridListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBt1ZE9xLrYSzTI-1zYg_pl10jmsCHGShQ'
    })
,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

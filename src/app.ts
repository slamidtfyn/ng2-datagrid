//our root app component
import {Component, NgModule,ViewChild,OnInit} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FocusedDirective} from './focused.directive'
import {GridComponent} from './grid'
import { FormsModule }   from '@angular/forms';
import { HttpModule} from '@angular/http';

@Component({
  selector: 'my-app',
  template: '<sl-grid></sl-grid>'
 
  
})
export class App implements OnInit  {
  name:string;
  constructor() {
    this.name = 'Angular2';
    
  }
 
}

@NgModule({
  imports: [ BrowserModule,FormsModule,HttpModule ],
  declarations: [ App,FocusedDirective,GridComponent ],
  bootstrap: [ App ]
})
export class AppModule {
  
  
}
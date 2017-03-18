import { Component, NgModule, OnInit, OnChanges } from '@angular/core'
import { Http } from '@angular/http';

interface line
{
Bilag:number;
Navn:string;
Konto:string;
Debet:number;
Kredit:number;

}

@Component({
  selector: 'sl-grid',
  templateUrl: 'src/grid.template.htm'
})
export class GridComponent implements OnInit, OnChanges {

  rows: Array<any> = [];
  log: any;
  cols = 1;
  pos = { row: 0, col: 0 }
  coldef = [
    { name: "Bilag", type: "number", required: true },
    { name: "Navn", type: "text",required:true },
    { name: "Konto", type: "text",required:true },
    { name: "Debet", type: "number" },
    { name: "Kredit", type: "number" }
    ]
  constructor(private http: Http) {

  }

  ngOnInit() {
    this.rows = [{Bilag:1,Navn:"Bilag 1",Konto:"1000" }];
    this.cols = this.coldef.length - 1;
  }

  ngOnChanges(change) {
    this.cols = this.coldef.length - 1;
  }

  ch(event) {
    this.log = this.rows;
  }

  deleteRow() {
    this.rows.splice(this.pos.row, 1);
    if (this.pos.row >= this.rows.length) this.pos.row--;
    if (this.pos.row < 0) this.pos.row = 0;
    this.move();
  }

  addRow() {
const current:line=this.rows[this.pos.row];
const bilag=this.rows.filter(p=>p.Bilag==current.Bilag);
var debit:number=0;
bilag.filter((p:line)=>p.Debet).forEach((value:any)=> {
  
  debit+=parseFloat(value.Debet)});
var credit:number=0;
bilag.filter((p:line)=>p.Kredit).forEach((value:line)=>credit+=value.Kredit);
    console.log("Debet "+debit);
    console.log("Kredit "+credit);

 if(debit==credit)
  this.rows.push({ Bilag:current.Bilag+1});
 else
    this.rows.push({ Bilag:current.Bilag,Navn:current.Navn  });
    this.pos.row = this.rows.length - 1;
    this.pos.col = 0;
    this.move();
  }

  move() {
    this.pos = { row: this.pos.row, col: this.pos.col };
    console.log(this.pos);
  }

  keydown(event: KeyboardEvent) {

    if (event.ctrlKey || event.metaKey) {
      switch (String.fromCharCode(event.which).toLowerCase()) {
        case 'a':
          event.preventDefault();
          this.addRow();
          return;
        case 's':

          event.preventDefault();
          this.deleteRow()
          return;

      }
    }

    if (event.which == 38 && this.pos.row > 0) {
      this.pos.row--;
      this.move();
      event.preventDefault();
    }
    else if (event.which == 40 && this.pos.row < this.rows.length) {
      this.pos.row++;
      this.move();
      event.preventDefault();
    }
    else if (event.which == 39 || (event.which == 9 && !event.shiftKey)) {
      if (this.pos.col < this.cols)
        this.pos.col++;
      else
        this.pos.col = 0;
      this.move();
      event.preventDefault();
    }
    else if (event.which == 37 || (event.which == 9 && event.shiftKey)) {
      if(this.pos.col > 0)this.pos.col--;
      else this.pos.col=this.cols;
      this.move();
      event.preventDefault();
    }
    
    else console.log(event);
  }

}

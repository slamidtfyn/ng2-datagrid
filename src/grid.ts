import { Component, NgModule, OnInit, OnChanges } from '@angular/core'
import { Http } from '@angular/http';
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
    { name: "A", type: "number", required: true },
    { name: "B", type: "text" },
    { name: "C", type: "text" }]
  constructor(private http: Http) {

  }

  ngOnInit() {
    this.rows = [{ A: null, B: null }];
    this.cols = this.coldef.length - 1;
  }

  ngOnChanges(change) {
    this.cols = this.coldef.length - 1;
  }

  ch(event) {
    this.log = this.rows;
  }

  deleteRow() {
    this.rows.splice(this.pos.row - 1, 1);
    if (this.pos.row >= this.rows.length) this.pos.row--;
    if (this.pos.row < 0) this.pos.row = 0;
  }

  addRow() {

    this.rows.push({ A: null, B: null });
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

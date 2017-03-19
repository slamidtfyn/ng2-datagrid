import {Directive, Input,
   Renderer, 
   ElementRef,
   OnChanges} from '@angular/core'


@Directive({
  selector: 'input'
})
export class FocusedDirective implements OnChanges {
  @Input() col;
  @Input() row;
  @Input() pos;
 
 
  ngOnChanges(x)
  {
    console.log(x);
    if(this.pos && this.pos.col==this.col && this.pos.row==this.row){
      
      this.elementRef.nativeElement.focus();
    }
    
    
  }
  constructor(private elementRef: ElementRef, private renderer: Renderer){}
}
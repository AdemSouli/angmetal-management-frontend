import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit{
 
  public navItems = navItems;
  
  ngOnInit(): void {
    console.log('this is the navItems icon',this.navItems);
  }
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ListItem } from './model/listItem';
import * as data from '../../../assets/data/menuItems.json';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  listItems: ListItem[] = data.menuItems;
  show: boolean[];
  @Output() onToggleMenu = new EventEmitter();

  ngOnInit() {
  }

  showElemento(item: ListItem) {
    item.show = !item.show;
  }

  toggleClick() {
    this.onToggleMenu.emit();
  }

}

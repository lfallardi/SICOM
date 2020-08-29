import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as data from '../../../assets/data/menuItems.json';
import { ListItem } from '../side-nav/model/listItem';

@Component({
  selector: 'app-side-nav-icons',
  templateUrl: './side-nav-icons.component.html',
  styleUrls: ['./side-nav-icons.component.css']
})
export class SideNavIconsComponent implements OnInit {
  listItems: ListItem[] = data.menuItems;
  show: boolean[];
  @Output() onToggleMenu = new EventEmitter();

  ngOnInit() {}

  toggleClick() {
    this.onToggleMenu.emit();
  }

  showElemento(item: ListItem) {
    item.show = !item.show;
  }

}

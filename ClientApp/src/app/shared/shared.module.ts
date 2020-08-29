import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabComponent } from './components/tabs/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';

import { AccordionComponent } from './components/accordions/accordion.component';
import { AccordionGroupComponent } from './components/accordions/accordion-group.component';
import { ApplicationResolutionService } from '../../services/app-resolution.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TabComponent,
    TabsComponent,
    AccordionComponent,
    AccordionGroupComponent
  ],
  providers: [
    ApplicationResolutionService
  ],
  exports: [
    TabComponent,
    TabsComponent,
    AccordionComponent,
    AccordionGroupComponent
  ]
})
export class SharedModule { }

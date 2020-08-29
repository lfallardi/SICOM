import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// NAVEGACION
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminEmpresasComponent } from './Empresas/Administracion/admin-empresas/admin-empresas.component';

// FIN DE NAVEGACION

import { TokenInterceptor } from '../interceptors/token.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
   MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatInputModule, MatProgressSpinnerModule,
   MatCardModule, MatDialogModule, MatSidenavModule, MatToolbarModule, MatListModule, MatDividerModule,
   MatSelectModule, MatTabsModule, MatPaginatorModule, MatSnackBarModule, MatBadgeModule,
   MatNativeDateModule, MatSortModule, MatExpansionModule, MatSlideToggleModule,
   MatGridListModule,
   MatDatepickerModule,
   MatTableModule,
   MatProgressBarModule,
   MatStepperModule
 } from '@angular/material';
import { NgxBarcodeModule } from 'ngx-barcode';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SidebarModule } from 'ng-sidebar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { UiModule } from './ui/ui.module';
import { ModalConfirmComponent } from './common/modal-confirm/modal-confirm.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { LoginAdComponent } from './login-ad/login-ad.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logOut/logout/logout.component';
import { NewEmpresaComponent } from './Empresas/ModalComponents/new-empresa/new-empresa.component';
import { EditEmpresaComponent } from './Empresas/ModalComponents/edit-empresa/edit-empresa.component';
import { AdminTiposEmpresasComponent } from './Empresas/Administracion/admin-tipos-empresas/admin-tipos-empresas.component';
import { AdminOrganismosComponent } from './Empresas/Administracion/admin-organismos/admin-organismos.component';
import { NewTipoEmpresaComponent } from './Empresas/ModalComponents/new-tipo-empresa/new-tipo-empresa.component';
import { EditTipoEmpresaComponent } from './Empresas/ModalComponents/edit-tipo-empresa/edit-tipo-empresa.component';
import { NewOrganismoComponent } from './Empresas/ModalComponents/new-organismo/new-organismo.component';
import { EditOrganismoComponent } from './Empresas/ModalComponents/edit-organismo/edit-organismo.component';


export function tokenGetter() {
   return localStorage.getItem('jwt');
}

export function loggerCallBack(logLevel, message, piiEntable) {
   console.log('Cliente logging' + message);
}

export const protectedResourceMap: [ string, string[]][] = [ [  'https://buildtodoservice.azurewebsites.net/api/todolist',
                                                               ['api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user']
                                                             ], [ 'https://graph.microsoft.com/v1.0/me',
                                                                 ['user.read']
                                                                ]
                                                            ];

const isIE = window.navigator.userAgent.indexOf('MSIE') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
   declarations: [
      AppComponent,
      LoginAdComponent,
      LoginComponent,
      LogoutComponent,
      NotFoundComponent,
      ModalConfirmComponent,
      AdminEmpresasComponent,
      NewEmpresaComponent,
      EditEmpresaComponent,
      AdminTiposEmpresasComponent,
      AdminOrganismosComponent,
      NewTipoEmpresaComponent,
      EditTipoEmpresaComponent,
      NewOrganismoComponent,
      EditOrganismoComponent
      
   ],
   imports: [
      NgxMatSelectSearchModule,
      NgxBarcodeModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      BrowserModule,
      MatButtonModule,
      MatCheckboxModule,
      MatMenuModule,
      MatIconModule,
      MatInputModule,
      MatDatepickerModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatCardModule,
      MatDialogModule,
      MatSidenavModule,
      MatToolbarModule,
      MatListModule,
      MatDividerModule,
      MatSelectModule,
      MatTabsModule,
      MatTableModule,
      MatPaginatorModule,
      MatSnackBarModule,
      MatBadgeModule,
      MatNativeDateModule,
      MatSortModule,
      MatExpansionModule,
      MatSlideToggleModule,
      MatStepperModule,
      MatGridListModule,
      CalendarModule.forRoot({
         provide: DateAdapter,
         useFactory: adapterFactory
       }),
      NgxSpinnerModule,
      SidebarModule.forRoot(),
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      UiModule
   ],
   providers: [AuthGuard, DatePipe, CurrencyPipe, MatDatepickerModule,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: TokenInterceptor,
         multi: true
      }
   ],
   bootstrap: [ AppComponent ],
   entryComponents: [
      ModalConfirmComponent,
      NewEmpresaComponent,
      EditEmpresaComponent,
      NewTipoEmpresaComponent,
      EditTipoEmpresaComponent,
      NewOrganismoComponent,
      EditOrganismoComponent
   ]
})

export class AppModule { }

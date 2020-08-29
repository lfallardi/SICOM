import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationResolutionService } from 'src/services/app-resolution.service';

// NAVEGACION
import { LayoutComponent } from './ui/layout/layout.component';
import { LoginAdComponent } from './login-ad/login-ad.component';
import { LogoutComponent } from './logOut/logout/logout.component';
import { AdminEmpresasComponent } from './Empresas/Administracion/admin-empresas/admin-empresas.component';
import { AdminTiposEmpresasComponent } from './Empresas/Administracion/admin-tipos-empresas/admin-tipos-empresas.component';
import { AdminOrganismosComponent } from './Empresas/Administracion/admin-organismos/admin-organismos.component';

const routes: Routes = [
  {path: '', component: LayoutComponent,
    children: [
      { path: 'empresas', component: AdminEmpresasComponent, data: {nexturl: '/empresas'}},
      { path: 'tipoEmpresas', component: AdminTiposEmpresasComponent, data: {nexturl: '/tipoEmpresas'}},
      { path: 'organismos', component: AdminOrganismosComponent, data: {nexturl: '/organismos'}},
    ]
  },
  {path: 'login', component: LoginAdComponent, data: {nexturl: '/login'}},
  {path: 'logout', component: LogoutComponent, data: {nexturl: '/logout'}},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor(private resolution: ApplicationResolutionService) { this.resolution.getIsMobileResolution(); }
}

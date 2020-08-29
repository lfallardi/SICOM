import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  spinnerMessage: string;
  _opened = true;

  nombreUsuario: string;
  CodUsuario: number;
  SucursalId: number;

  constructor(private sharedService: SharedService, private router: Router,
              public modalService: ModalService) {
               }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  onActivate(componentReference) {
    this.spinnerMessage = componentReference.hasOwnProperty('spinnerMessage') ? componentReference.spinnerMessage : 'Cargando...';
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  logOut() {
    localStorage.clear();
    this.sharedService.clearLocalStorage();
    this.router.navigate(['login']);
  }


  // openCambioSucursal() {
  //   let dialogRef;

  //   dialogRef = this.modalService.open(ConfiguracionSucursalUsuarioComponent, {width: '800px'});

  //   dialogRef.componentInstance.onUpdateSucursal.subscribe(() => {
  //     this.modalService.closeAll();
  //   });

  // }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceGen } from 'src/services/serviceGen.service';
import { Empresas } from 'src/app/shared/Models/empresasModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpinnerService } from 'src/services/spinner.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { ModalService } from 'src/services/modal.service';
import { NewEmpresaComponent } from '../../ModalComponents/new-empresa/new-empresa.component';
import { EditEmpresaComponent } from '../../ModalComponents/edit-empresa/edit-empresa.component';
import { empresas } from '../../../../model/Empresas';

@Component({
  selector: 'app-admin-empresas',
  templateUrl: './admin-empresas.component.html',
  styleUrls: ['./admin-empresas.component.css']
})
export class AdminEmpresasComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'empresa', 'direccion', 'editar'];
  dataSource = new MatTableDataSource<empresas>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  AdminEmpresas: FormGroup;

  constructor(private service: ServiceGen, private fb: FormBuilder,
              private spinner: SpinnerService, private modalService: ModalService) {
    this.setForm();
  }

  ngOnInit() {
    this.loadEmpresas();
  }

  setForm() {
    this.AdminEmpresas = this.fb.group({
      FiltroRapido: ''
    });
  }

  applyFilter() {
    this.dataSource.filter = this.AdminEmpresas.controls.FiltroRapido.value;
  }

  loadEmpresas() {
    this.spinner.show()
    this.service.getAll('V_Empresas', undefined, undefined, undefined)
                .subscribe(response => { this.spinner.hide();
                                         response.forEach(element => { this.dataSource.data = response; });
                                         this.dataSource.sort = this.sort;
                                         this.dataSource.paginator = this.paginator;
                }, error => {console.log(error)});
  }

  openNewEmpresa() {
    let dialogRef;

    dialogRef = this.modalService.open(NewEmpresaComponent, {width: '1000px;'})

    dialogRef.componentInstance.onConfirmComplete.subscribe(() => {
      this.modalService.closeAll();
      this.dataSource = new MatTableDataSource<empresas>();
      this.loadEmpresas();
    });

  }

  openEditEmpresa(row: Empresas) {
    let dialogRef;
    const dialogRefConfig = new MatDialogConfig;

    dialogRefConfig.data = row;
    dialogRefConfig.width = '1000px';
    dialogRefConfig.maxHeight = '1000px';
    dialogRefConfig.autoFocus = false;
    dialogRefConfig.disableClose = false;

    dialogRef = this.modalService.open(EditEmpresaComponent, dialogRefConfig);

    dialogRef.componentInstance.onEditComplete.subscribe(() => {
      this.modalService.closeAll();
      this.dataSource = new MatTableDataSource<empresas>();
      this.loadEmpresas();
    });

  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatSort, MatPaginator } from '@angular/material';
import { tipoEmpresa } from 'src/model/Empresas';
import { EditTipoEmpresaComponent } from '../../ModalComponents/edit-tipo-empresa/edit-tipo-empresa.component';
import { NewTipoEmpresaComponent } from '../../ModalComponents/new-tipo-empresa/new-tipo-empresa.component';
import { ServiceGen } from 'src/services/serviceGen.service';
import { SpinnerService } from 'src/services/spinner.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-admin-tipos-empresas',
  templateUrl: './admin-tipos-empresas.component.html',
  styleUrls: ['./admin-tipos-empresas.component.css']
})
export class AdminTiposEmpresasComponent implements OnInit {


  displayedColumns: string[] = ['tipoEmpresa', 'editar'];
  dataSource = new MatTableDataSource<tipoEmpresa>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  AdminTipoEmpresas: FormGroup;

  constructor(private service: ServiceGen, private fb: FormBuilder,
              private spinner: SpinnerService, private modalService: ModalService) {
    this.setForm();
  }

  ngOnInit() {
    this.loadTiposEmpresas();
  }

  setForm() {
    this.AdminTipoEmpresas = this.fb.group({
      FiltroRapido: ''
    });
  }

  applyFilter() {
    this.dataSource.filter = this.AdminTipoEmpresas.controls.FiltroRapido.value;
  }

  loadTiposEmpresas() {
    this.spinner.show()
    this.service.getAll('Tipos_Empresas', undefined, undefined, undefined)
                .subscribe(response => { this.spinner.hide();
                                         response.forEach(element => { this.dataSource.data = response; });
                                         this.dataSource.sort = this.sort;
                                         this.dataSource.paginator = this.paginator;
                }, error => {console.log(error)});
  }

  openNewTipoEmpresa() {
    let dialogRef;

    const dialogRefConfig = new MatDialogConfig;

    dialogRefConfig.width = '900px';
    dialogRefConfig.maxWidth = '900px';

    dialogRef = this.modalService.open(NewTipoEmpresaComponent, dialogRefConfig)

    dialogRef.componentInstance.onConfirmComplete.subscribe(() => {
      this.modalService.closeAll();
      this.dataSource = new MatTableDataSource<tipoEmpresa>();
      this.loadTiposEmpresas();
    });

  }

  openEditTipoEmpresa(row: tipoEmpresa) {
    let dialogRef;
    const dialogRefConfig = new MatDialogConfig;

    dialogRefConfig.data = row;
    dialogRefConfig.width = '1000px';
    dialogRefConfig.maxHeight = '1000px';
    dialogRefConfig.autoFocus = false;
    dialogRefConfig.disableClose = false;

    dialogRef = this.modalService.open(EditTipoEmpresaComponent, dialogRefConfig);

    dialogRef.componentInstance.onEditComplete.subscribe(() => {
      this.modalService.closeAll();
      this.dataSource = new MatTableDataSource<tipoEmpresa>();
      this.loadTiposEmpresas();
    });

  }

}

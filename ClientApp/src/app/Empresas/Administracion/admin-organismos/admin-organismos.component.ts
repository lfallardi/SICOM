import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceGen } from 'src/services/serviceGen.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpinnerService } from 'src/services/spinner.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { ModalService } from 'src/services/modal.service';
import { organismo } from '../../../../model/Empresas';
import { EditOrganismoComponent } from '../../ModalComponents/edit-organismo/edit-organismo.component';
import { NewOrganismoComponent } from '../../ModalComponents/new-organismo/new-organismo.component';


@Component({
  selector: 'app-admin-organismos',
  templateUrl: './admin-organismos.component.html',
  styleUrls: ['./admin-organismos.component.css']
})
export class AdminOrganismosComponent implements OnInit {


  displayedColumns: string[] = ['organismo', 'editar'];
  dataSource = new MatTableDataSource<organismo>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  AdminEmpresas: FormGroup;

  constructor(private service: ServiceGen, private fb: FormBuilder,
              private spinner: SpinnerService, private modalService: ModalService) {
    this.setForm();
  }

  ngOnInit() {
    this.loadOrganismos();
  }

  setForm() {
    this.AdminEmpresas = this.fb.group({
      FiltroRapido: ''
    });
  }

  applyFilter() {
    this.dataSource.filter = this.AdminEmpresas.controls.FiltroRapido.value;
  }

  loadOrganismos() {
    this.spinner.show()
    this.service.getAll('Organismos', undefined, undefined, undefined)
                .subscribe(response => { this.spinner.hide();
                                         response.forEach(element => { this.dataSource.data = response; });
                                         this.dataSource.sort = this.sort;
                                         this.dataSource.paginator = this.paginator;
                }, error => {console.log(error)});
  }

  openNewOrganismo() {
    let dialogRef;

    const dialogRefConfig = new MatDialogConfig;

    dialogRefConfig.width = '900px';
    dialogRefConfig.maxWidth = '900px';

    dialogRef = this.modalService.open(NewOrganismoComponent, dialogRefConfig)

    dialogRef.componentInstance.onConfirmComplete.subscribe(() => {
      this.modalService.closeAll();
      this.dataSource = new MatTableDataSource<organismo>();
      this.loadOrganismos();
    });

  }

  openEditOrganismo(row: organismo) {
    let dialogRef;
    const dialogRefConfig = new MatDialogConfig;

    dialogRefConfig.data = row;
    dialogRefConfig.width = '1000px';
    dialogRefConfig.maxHeight = '1000px';
    dialogRefConfig.autoFocus = false;
    dialogRefConfig.disableClose = false;

    dialogRef = this.modalService.open(EditOrganismoComponent, dialogRefConfig);

    dialogRef.componentInstance.onEditComplete.subscribe(() => {
      this.modalService.closeAll();
      this.dataSource = new MatTableDataSource<organismo>();
      this.loadOrganismos();
    });

  }

}

import { Component, OnInit, Inject, EventEmitter, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { empresas, organismo, tipoEmpresa, contactosEmpresas } from 'src/model/Empresas';
import { ServiceGen } from 'src/services/serviceGen.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { ModalService } from 'src/services/modal.service';
import { paises, provincias } from 'src/model/Ubicaciones';
import { ModalConfirmComponent } from 'src/app/common/modal-confirm/modal-confirm.component';
import { ModalConfig } from 'src/app/common/modal-confirm/model/ModalConfig';

function clsContacto(id, contacto, cargo, tipo_Contacto, valor) {
  this.id = id;
  this.contacto = contacto;
  this.cargo = cargo;
  this.tipo_Contacto = tipo_Contacto;
  this.valor = valor;
}

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrls: ['./edit-empresa.component.css']
})
export class EditEmpresaComponent implements OnInit {

  paises: paises[] = [];
  provincias: provincias[] = [];
  tiposEmpresas: tipoEmpresa[] = [];
  organismos: organismo[] = [];
  formNuevaEmpresa: FormGroup;
  public onEditComplete = new EventEmitter();

  displayedColumnsContacto: string[] = ['nombreContacto', 'cargo', 'tipoContacto', 'eliminar'];
  dataSourceContactos = new MatTableDataSource<contactosEmpresas>()

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public empresaDet: empresas,
              private service: ServiceGen, private fb: FormBuilder,
              private alert: AlertService, private modalService: ModalService) {
                console.log(this.empresaDet);
                this.loadPaises();
                this.loadProvincias(this.empresaDet.id_Pais);
                this.loadTiposEmpresas();
                this.loadOrganismos();
                this.loadContactos();
                this.setForm();
               }

  ngOnInit() {
  }

  setForm() {
    this.formNuevaEmpresa = this.fb.group({
      Codigo: this.empresaDet.codigo,
      Empresa: this.empresaDet.decripcion,
      TipoEmpresa: this.empresaDet.id_Tipo_Empresa,
      Organismo: this.empresaDet.id_Organismo,
      Contacto: this.empresaDet.contacto,
      Direccion: this.empresaDet.direccion,
      Altura: this.empresaDet.altura,
      Telefono: this.empresaDet.telefono,
      Email: this.empresaDet.email,
      Referencia: this.empresaDet.referencia,
      Pais: this.empresaDet.id_Pais,
      Pronvicias: this.empresaDet.id_Provincia,
      Observaciones: this.empresaDet.observaciones,
      NombreContacto: '',
      Cargo: '',
      TipoContacto: '',
      Valor: ''
    });
  }

  loadContactos(){
    this.service.getAll('Contactos',
                        undefined,
                        undefined,
                        btoa('[{"campo":"id_Empresa","comparacion":"=","valor":' + this.empresaDet.id_Empresa + '}]'))
                .subscribe(response => { response.forEach(element => { this.dataSourceContactos.data = response; });
                                         console.log(response);
                });
  }

  loadPaises() {
    this.service.getAll('Paises')
                .subscribe(response => { this.paises = response; });
  }

  loadProvincias(id_pais?) {
    this.service.getAll('Provincias',
                        undefined,
                        undefined,
                        id_pais === undefined ? undefined : btoa('[{"campo":"Id_Pais","comparacion":"=","valor":' + id_pais + '}]'))
                .subscribe(response => { this.provincias = response; });
  }

  loadTiposEmpresas() {
    this.service.getAll('Tipos_Empresas')
                .subscribe(response => { this.tiposEmpresas = response; });

  }

  loadOrganismos() {
    this.service.getAll('Organismos')
                .subscribe(response => { this.organismos = response; });

  }

  LimpiarContactos() {
    this.formNuevaEmpresa.controls.NombreContacto.setValue('');
    this.formNuevaEmpresa.controls.Cargo.setValue('');
    this.formNuevaEmpresa.controls.TipoContacto.setValue('');
    this.formNuevaEmpresa.controls.Valor.setValue('');
  }

  AgregarContacto() {
    const newContact = new clsContacto(this.dataSourceContactos.data.length,
                                       this.formNuevaEmpresa.controls.NombreContacto.value,
                                       this.formNuevaEmpresa.controls.Cargo.value,
                                       this.formNuevaEmpresa.controls.TipoContacto.value,
                                       this.formNuevaEmpresa.controls.Valor.value)

    this.dataSourceContactos.data.push(newContact);
    this.dataSourceContactos = new MatTableDataSource<contactosEmpresas>(this.dataSourceContactos.data);

    this.dataSourceContactos.sort = this.sort;
    this.dataSourceContactos.paginator = this.paginator;

    this.LimpiarContactos();

  }

  mustDisabledAddContact() {
    return (this.formNuevaEmpresa.controls.NombreContacto.value === '' &&
            this.formNuevaEmpresa.controls.Cargo.value === '' &&
            this.formNuevaEmpresa.controls.TipoContacto.value === '')
  }

  deleteContact(index) {
    const data = this.dataSourceContactos.data;
    data.splice(index, 1);
    this.dataSourceContactos._updateChangeSubscription();
  }

  editEmpresa() {
    let dialogRef;

    dialogRef = this.modalService.open(ModalConfirmComponent, {
      width: '800px',
      data: this.configModalConfirm(),
      autoFocus: false
    });

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.alert.success('Se modifico la empresa satisfactoriamente');
      this.onEditComplete.emit();
    });
  }

  configModalConfirm(): ModalConfig {
    const modalConfig = new ModalConfig();
    modalConfig.btnLabel = 'Aceptar';
    modalConfig.message = '¿Está seguro que desea modificar la emprersa?';
    modalConfig.tittle = 'Moficar empresa';
    modalConfig.showCancelButton = true;
    modalConfig.showCrossButton = true;
    return modalConfig;
  }
}

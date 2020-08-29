import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { ServiceGen } from 'src/services/serviceGen.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SpinnerService } from 'src/services/spinner.service';
import { ModalService } from 'src/services/modal.service';
import { AlertService } from 'src/services/alert.service';
import { DatePipe } from '@angular/common';
import { paises, provincias } from 'src/model/Ubicaciones';
import { tipoEmpresa, organismo, contactosEmpresas } from 'src/model/Empresas';
import { ModalConfirmComponent } from 'src/app/common/modal-confirm/modal-confirm.component';
import { ModalConfig } from 'src/app/common/modal-confirm/model/ModalConfig';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

function clsContacto(id, contacto, cargo, tipo_Contacto, valor) {
  this.id = id;
  this.contacto = contacto;
  this.cargo = cargo;
  this.tipo_Contacto = tipo_Contacto;
  this.valor = valor;
}

@Component({
  selector: 'app-new-empresa',
  templateUrl: './new-empresa.component.html',
  styleUrls: ['./new-empresa.component.css']
})
export class NewEmpresaComponent implements OnInit {

  paises: paises[] = [];
  provincias: provincias[] = [];
  tiposEmpresas: tipoEmpresa[] = [];
  organismos: organismo[] = [];
  formNuevaEmpresa: FormGroup;
  public onConfirmComplete = new EventEmitter();

  displayedColumnsContacto: string[] = ['nombreContacto', 'cargo', 'tipoContacto', 'eliminar'];
  dataSourceContactos = new MatTableDataSource<contactosEmpresas>();
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private service: ServiceGen, private fb: FormBuilder,
              private spinner: SpinnerService, public modalService: ModalService,
              private alert: AlertService, private datepipe: DatePipe) {
                this.loadPaises();
                this.loadTiposEmpresas();
                this.loadOrganismos();
                this.setForm();
              }

  ngOnInit() {
  }

  setForm() {
    this.formNuevaEmpresa = this.fb.group({
      Codigo: '',
      Empresa: '',
      TipoEmpresa: '',
      Organismo: '',
      Contacto: '',
      Direccion: '',
      Altura: '',
      Telefono: '',
      Email: '',
      Referencia: '',
      Pais: '',
      Pronvicias: '',
      Observaciones: '',
      NombreContacto: '',
      Cargo: '',
      TipoContacto: '',
      Valor: ''
    });
  }

  loadPaises() {
    this.service.getAll('Paises')
                .subscribe(response => { this.paises = response; });
  }

  loadProvincias() {
    this.service.getAll('Provincias',
                        undefined,
                        undefined,
                        btoa('[{"campo":"Id_Pais","comparacion":"=","valor":' + this.formNuevaEmpresa.controls.Pais.value + '}]'))
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

  AddNewEmpresa() {
    let dialogRef;

    dialogRef = this.modalService.open(ModalConfirmComponent, {
      width: '800px',
      data: this.configModalConfirm(),
      autoFocus: false
    });

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.alert.success('Se creo la empresa satisfactoriamente');
      this.onConfirmComplete.emit();
    });
  }

  configModalConfirm(): ModalConfig {
    const modalConfig = new ModalConfig();
    modalConfig.btnLabel = 'Aceptar';
    modalConfig.message = '¿Está seguro que desea confirmar la emprersa?';
    modalConfig.tittle = 'Confirmar nueva empresa';
    modalConfig.showCancelButton = true;
    modalConfig.showCrossButton = true;
    return modalConfig;
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

}

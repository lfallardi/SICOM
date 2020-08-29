import { Component, OnInit, EventEmitter } from '@angular/core';
import { ModalConfirmComponent } from 'src/app/common/modal-confirm/modal-confirm.component';
import { ModalConfig } from 'src/app/common/modal-confirm/model/ModalConfig';
import { ServiceGen } from 'src/services/serviceGen.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from 'src/services/modal.service';
import { AlertService } from 'src/services/alert.service';
import { SpinnerService } from 'src/services/spinner.service';

// constructor de clase para la generacion del JSON
function clsTipoEmpresas(NombreTabla, Top, Metodo, Data, Condicion) {
  this.NombreTabla = NombreTabla;
  this.Top = Top;
  this.Metodo = Metodo;
  this.Data = Data;
  this.Condicion = Condicion;
}

@Component({
  selector: 'app-new-tipo-empresa',
  templateUrl: './new-tipo-empresa.component.html',
  styleUrls: ['./new-tipo-empresa.component.css']
})
export class NewTipoEmpresaComponent implements OnInit {

  formNuevoTipoEmpresa: FormGroup;
  public onConfirmComplete = new EventEmitter();

  constructor(private service: ServiceGen, private fb: FormBuilder,
              public modalService: ModalService, private spinner: SpinnerService,
              private alert: AlertService) {
                this.setForm();
              }

  ngOnInit() {
  }

  setForm() {
    this.formNuevoTipoEmpresa = this.fb.group({
      TipoEmpresa: ''
    });
  }

  AddNewTipoEmpresa() {
    let dialogRef;

    dialogRef = this.modalService.open(ModalConfirmComponent, {
      width: '800px',
      data: this.configModalConfirm(),
      autoFocus: false
    });

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.spinner.show();
      let TiposEmpresas = [];
      let rta;

      const tipoEmpresa = new clsTipoEmpresas('Tipos_Empresas_Ins', 1, 'spexec',
                                            '{"Descripciopn":"' + this.formNuevoTipoEmpresa.controls.TipoEmpresa.value + '"' + '}', '');

      TiposEmpresas.push(tipoEmpresa);

      this.service.post(TiposEmpresas).subscribe(response => { rta = response;
                                                           if (rta.hasErrorId > 0) {
                                                             this.spinner.hide();
                                                             return this.alert.error(rta.descriptionError);
                                                           }
                                                           this.spinner.hide();
                                                           this.alert.success('Se creo el tipo de empresa satisfactoriamente');
                                                           this.onConfirmComplete.emit();
                                                         }, errorResponse => { this.spinner.hide();
                                                                               errorResponse.error.Errors.array.forEach(element => this.alert.error(element));
      });

    });
  }

  configModalConfirm(): ModalConfig {
    const modalConfig = new ModalConfig();
    modalConfig.btnLabel = 'Aceptar';
    modalConfig.message = '¿Está seguro que desea confirmar el tipo de empresa?';
    modalConfig.tittle = 'Confirmar nuevo tipo de empresa';
    modalConfig.showCancelButton = true;
    modalConfig.showCrossButton = true;
    return modalConfig;
  }

}

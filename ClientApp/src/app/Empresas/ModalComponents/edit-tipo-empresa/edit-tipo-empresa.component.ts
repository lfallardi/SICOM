import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { tipoEmpresa } from 'src/model/Empresas';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceGen } from 'src/services/serviceGen.service';
import { ModalService } from 'src/services/modal.service';
import { AlertService } from 'src/services/alert.service';
import { SpinnerService } from 'src/services/spinner.service';
import { ModalConfirmComponent } from 'src/app/common/modal-confirm/modal-confirm.component';
import { ModalConfig } from 'src/app/common/modal-confirm/model/ModalConfig';

@Component({
  selector: 'app-edit-tipo-empresa',
  templateUrl: './edit-tipo-empresa.component.html',
  styleUrls: ['./edit-tipo-empresa.component.css']
})
export class EditTipoEmpresaComponent implements OnInit {

  formTipoEmpresa: FormGroup;
  public onEditComplete = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public tipoEmpresaDet: tipoEmpresa,
              private service: ServiceGen, private fb: FormBuilder,
              private spinner: SpinnerService, public modalService: ModalService,
              private alert: AlertService) {
                this.setForm();
              }

  ngOnInit() {
  }

  setForm() {
    this.formTipoEmpresa = this.fb.group({
      TipoEmpresa: this.tipoEmpresaDet.descripciopn
    });
  }

  editTipoEmpresa() {
    let dialogRef;

    dialogRef = this.modalService.open(ModalConfirmComponent, {
      width: '800px',
      data: this.configModalConfirm(),
      autoFocus: false
    });

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.alert.success('Se modifico el tipo de empresa satisfactoriamente');
      this.onEditComplete.emit();
    });
  }

  configModalConfirm(): ModalConfig {
    const modalConfig = new ModalConfig();
    modalConfig.btnLabel = 'Aceptar';
    modalConfig.message = '¿Está seguro que desea modificar el tipo de empresa?';
    modalConfig.tittle = 'Modificar tipo de empresa';
    modalConfig.showCancelButton = true;
    modalConfig.showCrossButton = true;
    return modalConfig;
  }

}

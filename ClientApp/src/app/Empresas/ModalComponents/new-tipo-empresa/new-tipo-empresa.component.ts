import { Component, OnInit, EventEmitter } from '@angular/core';
import { ModalConfirmComponent } from 'src/app/common/modal-confirm/modal-confirm.component';
import { ModalConfig } from 'src/app/common/modal-confirm/model/ModalConfig';
import { ServiceGen } from 'src/services/serviceGen.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from 'src/services/modal.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-new-tipo-empresa',
  templateUrl: './new-tipo-empresa.component.html',
  styleUrls: ['./new-tipo-empresa.component.css']
})
export class NewTipoEmpresaComponent implements OnInit {

  formNuevoTipoEmpresa: FormGroup;
  public onConfirmComplete = new EventEmitter();

  constructor(private service: ServiceGen, private fb: FormBuilder,
              public modalService: ModalService,
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
      this.alert.success('Se creo el tipo de empresa satisfactoriamente');
      this.onConfirmComplete.emit();
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

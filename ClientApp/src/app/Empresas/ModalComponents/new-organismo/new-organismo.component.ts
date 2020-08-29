import { Component, OnInit, EventEmitter } from '@angular/core';
import { ModalConfig } from 'src/app/common/modal-confirm/model/ModalConfig';
import { ModalConfirmComponent } from 'src/app/common/modal-confirm/modal-confirm.component';
import { ServiceGen } from 'src/services/serviceGen.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from 'src/services/modal.service';
import { SpinnerService } from 'src/services/spinner.service';
import { AlertService } from 'src/services/alert.service';

// constructor de clase para la generacion del JSON
function clsOrganismos(NombreTabla, Top, Metodo, Data, Condicion) {
  this.NombreTabla = NombreTabla;
  this.Top = Top;
  this.Metodo = Metodo;
  this.Data = Data;
  this.Condicion = Condicion;
}


@Component({
  selector: 'app-new-organismo',
  templateUrl: './new-organismo.component.html',
  styleUrls: ['./new-organismo.component.css']
})
export class NewOrganismoComponent implements OnInit {

  formNuevoOrganismo: FormGroup;
  public onConfirmComplete = new EventEmitter();

  constructor(private service: ServiceGen, private fb: FormBuilder,
              private spinner: SpinnerService, public modalService: ModalService,
              private alert: AlertService) {
                this.setForm();
              }

  ngOnInit() {
  }

  setForm() {
    this.formNuevoOrganismo = this.fb.group({
      Organismo: ''
    });
  }

  AddNewOrganismo() {
    let dialogRef;

    dialogRef = this.modalService.open(ModalConfirmComponent, {
      width: '800px',
      data: this.configModalConfirm(),
      autoFocus: false
    });

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      let Organismo = [];
      let rta;

      const organismo = new clsOrganismos('Organismos_Ins', 1, 'spexec',
                                              '{"Descripcion":"' + this.formNuevoOrganismo.controls.Organismo.value + '"' + '}', '');

      Organismo.push(organismo);

      this.service.post(Organismo).subscribe(response => { rta = response;
                                                           if (rta.hasErrorId > 0) {
                                                             this.spinner.hide();
                                                             return this.alert.error(rta.descriptionError);
                                                           }
                                                           this.spinner.hide();
                                                           this.alert.success('Se creo el organismo satisfactoriamente');
                                                           this.onConfirmComplete.emit();
                                                         }, errorResponse => { this.spinner.hide();
                                                                               errorResponse.error.Errors.array.forEach(element => this.alert.error(element));
      });

    });
  }

  configModalConfirm(): ModalConfig {
    const modalConfig = new ModalConfig();
    modalConfig.btnLabel = 'Aceptar';
    modalConfig.message = '¿Está seguro que desea confirmar el organismo?';
    modalConfig.tittle = 'Confirmar nuevo organismo';
    modalConfig.showCancelButton = true;
    modalConfig.showCrossButton = true;
    return modalConfig;
  }

}

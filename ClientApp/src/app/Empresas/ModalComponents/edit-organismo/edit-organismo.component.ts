import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { ModalConfirmComponent } from 'src/app/common/modal-confirm/modal-confirm.component';
import { ModalConfig } from 'src/app/common/modal-confirm/model/ModalConfig';
import { MAT_DIALOG_DATA } from '@angular/material';
import { organismo } from 'src/model/Empresas';
import { ServiceGen } from 'src/services/serviceGen.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpinnerService } from 'src/services/spinner.service';
import { ModalService } from 'src/services/modal.service';
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
  selector: 'app-edit-organismo',
  templateUrl: './edit-organismo.component.html',
  styleUrls: ['./edit-organismo.component.css']
})
export class EditOrganismoComponent implements OnInit {

  formOrganismo: FormGroup;
  public onEditComplete = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public organismoDet: organismo,
              private service: ServiceGen, private fb: FormBuilder,
              private spinner: SpinnerService, public modalService: ModalService,
              private alert: AlertService) {
                this.setForm();
              }

  ngOnInit() {
  }

  setForm() {
    this.formOrganismo = this.fb.group({
      Organismo: this.organismoDet.descripcion
    });
  }

  editOrganismo() {
    let dialogRef;

    dialogRef = this.modalService.open(ModalConfirmComponent, {
      width: '800px',
      data: this.configModalConfirm(),
      autoFocus: false
    });

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      let Organismo = [];
      let rta;

      const organismo = new clsOrganismos('Organismos_Upd', 1, 'spexec',
                                        '{"Id_Organismo":' + this.organismoDet.id_Organismo + 
                                       ', "Descripcion":"' + this.formOrganismo.controls.Organismo.value + '"' + '}', '');

      Organismo.push(organismo);

      this.service.post(Organismo).subscribe(response => { rta = response;
                                                           if (rta.hasErrorId > 0) {
                                                             this.spinner.hide();
                                                             return this.alert.error(rta.descriptionError);
                                                           }
                                                           this.spinner.hide();
                                                           this.alert.success('Se modifico el organismo satisfactoriamente');
                                                           this.onEditComplete.emit();
                                                         }, errorResponse => { this.spinner.hide();
                                                                               errorResponse.error.Errors.array.forEach(element => this.alert.error(element));
      });

    });
  }

  configModalConfirm(): ModalConfig {
    const modalConfig = new ModalConfig();
    modalConfig.btnLabel = 'Aceptar';
    modalConfig.message = '¿Está seguro que desea modificar el organismo?';
    modalConfig.tittle = 'Modificar organismo';
    modalConfig.showCancelButton = true;
    modalConfig.showCrossButton = true;
    return modalConfig;
  }

}

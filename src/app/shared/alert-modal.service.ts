import { Injectable } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

enum AlertTypes {
    DANGER = 'danger',
    SUCCESS = 'success',
    WARNING = 'warning',
    INFO = 'info'
}

@Injectable({
    providedIn: 'root'
})
export class AlertModalService {

    constructor(
        private modalService: BsModalService
    ) { }

    private showAlert(message: string, type: AlertTypes, dismissTimeOut?: number) {
        const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
        bsModalRef.content.type = type;
        bsModalRef.content.message = message;

        if (dismissTimeOut) {
            setTimeout(() => {
                bsModalRef.hide();
            }, dismissTimeOut);
        }
    }

    showAlertDanger(message: string) {
        this.showAlert(message, AlertTypes.DANGER, 3000);
    }

    showAlertSuccess(message: string) {
        this.showAlert(message, AlertTypes.SUCCESS);
    }

    showAlertInfo(message: string) {
        this.showAlert(message, AlertTypes.INFO);
    }

    showAlertWarning(message: string) {
        this.showAlert(message, AlertTypes.WARNING);
    }

    showConfirmModal(title: string, message: string, confirmTxt?: string, cancelTxt?: string): Subject<boolean> {
        const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
        bsModalRef.content.title = title;
        bsModalRef.content.message = message;

        if (confirmTxt) {
            bsModalRef.content.confirmTxt = confirmTxt;
        }
        if (cancelTxt) {
            bsModalRef.content.cancelTxt = cancelTxt;
        }

        return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
    }


}

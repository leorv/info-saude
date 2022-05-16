import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
    @Input() title: string = '';
    @Input() message: string = '';
    @Input() cancelTxt: string = 'Cancelar';
    @Input() confirmTxt: string = 'Confirmar';

    confirmResult: Subject<boolean> = new Subject();

    constructor(private modalRef: BsModalRef) { }

    ngOnInit(): void {
    }

    onClose() {
        this.modalRef.hide();
    }

    onConfirm() {
        this.confirmAndCLose(true);
    }

    onDecline() {
        this.confirmAndCLose(false);
    }

    private confirmAndCLose(value: boolean) {
        this.confirmResult.next(value);
        this.onClose();
    }
}

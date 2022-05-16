import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

    @Input() message: string = '';
    @Input() type: string = 'success';

    constructor(
        private modalRef: BsModalRef
    ) { }
    
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    onClose() {
        this.modalRef.hide();
    }
}

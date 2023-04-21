import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'newgen-confirm-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
    confirmationForm: FormGroup;

    public confirmMessage: string;
    public title: string;
    public subTitle: string;
    public confirmButton: string;
    public cancelButton: string;
    public persistMessage: string;
    public commitMessage = false;
    public disableButton = true;
    public applyConfirmationRule = true;

    public nameLabel: string;
    public toConfirmationMessage: string;
    public textControl: string;
    message: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<NewgenConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
    ) {
        // if applyConfirmationRule was not sended by the parent and it equels the undefined, we set it true as default.
        this.applyConfirmationRule = data.applyConfirmationRule === undefined ? true : data.applyConfirmationRule;

        // if applyConfirmationRule is true, make button is disabled.
        this.applyConfirmationRule ? this.disableButton = true : this.disableButton = false;

        this.persistMessage = data.persistMessage;
        this.confirmMessage = data.confirmMessage;
        this.title = data.title;
        this.subTitle = data.subTitle;
        this.confirmButton = data.confirmButton ? data.confirmButton : 'MODALDIALOG.CONFIRM';
        this.cancelButton = data.cancelButton ? data.cancelButton : 'MODALDIALOG.CANCEL';

        this.nameLabel = data.nameLabel;
        this.textControl = data.textControl;
        this.toConfirmationMessage = data.toConfirmationMessage;

        if (data.commitMessage) {
            this.commitMessage = data.commitMessage;
        }
    }

    ngOnInit(): void {
        this.confirmationForm = this._formBuilder.group({
            name: new FormControl('', Validators.required)
        });
    }

    onKey(event: any): void {
        if (event.target.value === this.textControl) {
            this.disableButton = false;
        } else {
            this.disableButton = true;
        }
    }

}

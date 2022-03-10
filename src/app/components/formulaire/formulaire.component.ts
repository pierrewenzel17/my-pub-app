import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Beer } from 'app/models/beer';

@Component({
  selector: 'formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {

  form: FormGroup;
  @Input() beerModel: Beer;
  @ViewChild("fileInput") fileInput!: ElementRef;

  @Output('cancel') cancelEvent$: EventEmitter<any>;
  @Output('submit') submitEvent$: EventEmitter<any>;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor() {
    this.submitEvent$ = new EventEmitter();
    this.cancelEvent$ = new EventEmitter();
    this.form = FormulaireComponent.buildForm();
    this.beerModel = {}
  }

  ngOnInit(): void {
    this.form.patchValue({
      id: this.beerModel.id,
      name: this.beerModel.name,
      country: this.beerModel.country,
      type: this.beerModel.type,
      categories: this.beerModel.categories,
      bottle: this.beerModel.bottle,
      degree: this.beerModel.degree,
      description: this.beerModel.description
    });
  }

  cancel() {
    this.cancelEvent$.emit();
  }

  submit(beer: Beer) { //Formulaire
    this.submitEvent$.emit(beer);
  }

  private static buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      country: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      type: new FormControl('', Validators.required),
      categories: new FormControl('', Validators.required),
      bottle: new FormControl(0,Validators.compose([Validators.required, Validators.min(0)])),
      degree: new FormControl(0, Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])),
      description: new FormControl('', Validators.required)
    });
  }
}

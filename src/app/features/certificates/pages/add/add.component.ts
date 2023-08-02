import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GiftCertificateService } from '@api/services';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: GiftCertificateService
  ) {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
        ],
      ],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      price: ['', [Validators.required, Validators.min(0)]],
      duration: ['', [Validators.required, Validators.min(0)]],
      tags: this.fb.array(
        [this.getTagControl(), this.getTagControl()],
        [Validators.maxLength(100)]
      ),
    });
  }

  get formTags() {
    return this.form.controls['tags'] as FormArray;
  }

  getTagControl() {
    return this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60),
    ]);
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.service.create(this.form.value).subscribe(data => {
      console.log(data);
    });
  }

  removeTag(i: number) {
    this.formTags.removeAt(i);
  }

  addTag() {
    this.formTags.push(this.getTagControl());
  }
}

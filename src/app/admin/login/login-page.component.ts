import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: LoginService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  submitForm() {
    console.log(this.form);
    if (this.form.valid) {
      this.service.getUser().subscribe(res => {
        const user = res.find(e => e.email == this.form.value.email && e.senha == this.form.value.password);
        if (user) {
          console.log(user)
          this.router.navigate(['/admin/produtos']);
        }
      })
    } else {
      // @todo adicionar mensagem de erro
      return;
    }
  }

}

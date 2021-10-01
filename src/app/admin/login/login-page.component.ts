import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
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
    private service: LoginService,
    private snackBarService: SnackBarService
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
    if (this.form.valid) {
      this.service.getUser().subscribe(res => {
        const user = res.find(e => e.email == this.form.value.email && e.senha == this.form.value.password);

        if (user) {
          localStorage.setItem('LOCAL_USER_LOGGED', JSON.stringify(user));
          this.router.navigate(['/admin/produtos']);
        } else {
          this.snackBarService.openSnackBar('Usuário ou senha incorretos. Tente novamente.', 'bg-danger-color');
        }

      }, err => {
        this.snackBarService.openSnackBar('Não foi possível realizar o login. Tente novamente.', 'bg-secondary-color');
      });

    } else {
      this.snackBarService.openSnackBar('Preencha corretamente os campos.', 'bg-warning-color');
      return;
    }
  }
}

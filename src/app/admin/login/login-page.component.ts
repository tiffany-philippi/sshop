import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private service: LoginService,
    private _snackBar: MatSnackBar
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
          console.log(user)
          localStorage.setItem('user_logged', JSON.stringify(user));
          location.reload();
          this.router.navigate(['/admin/produtos']);
        } else {
          this.openSnackBar('Usuário ou senha incorretos. Tente novamente.', 'bg-danger-color');
        }
      }, err => {
        this.openSnackBar('Não foi possível realizar o login. Tente novamente.', 'bg-secondary-color');
      });
    } else {
        this.openSnackBar('Preencha corretamente os campos. Tente novamente.', 'bg-warning-color');
        return;
    }
  }

  openSnackBar(text: string, panelClass: string) {
    this._snackBar.open(text, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: panelClass
    });
  }

}

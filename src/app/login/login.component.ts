import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'app/components/helpers/common-helper';
import { Login } from 'app/components/models/login-request-dto';
import { CommonService } from 'app/shared/services/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  loginValid = true;
  loginModel = new Login();

  constructor(public commonService: CommonService, public ch: CommonHelper, public router: Router) { }

  ngOnInit() {
    if (this.ch.isLoggedIn()) {
      this.gotoHomePage();
    }
  }

  onSubmit() {
    this.loginModel.email = this.email;
    this.loginModel.password = this.password;
    this.commonService.login(this.loginModel).subscribe((res) => {
      if (res != null) {
        this.ch.successMessage("Başarıyla giriş yaptınız!")
        localStorage.setItem('user_info', JSON.stringify(res));
        this.ch.setCurrentUser();
        this.gotoHomePage();
        this.commonService.loginSubs(true);
      } else {
        this.commonService.loginSubs(false);
        this.ch.errorMessage("Kullanıcı adı veya şifreniz hatalı!");
      }
    })
  }

  gotoHomePage() {
    this.router.navigate(['/dashboard']);

  }

  register() {
    this.router.navigate(['/register']);

  }

}

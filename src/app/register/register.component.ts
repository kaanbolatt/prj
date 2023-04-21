import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'app/components/helpers/common-helper';
import { Login } from 'app/components/models/login-request-dto';
import { CommonService } from 'app/shared/services/common.service';
import { Router } from '@angular/router';
import { Register } from 'app/components/models/register-request-dto';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  registerModel = new Register();

  constructor(public commonService: CommonService, public ch: CommonHelper, public router: Router) { }

  ngOnInit() {
    if (this.ch.isLoggedIn()) {
      this.gotoHomePage();
    }
  }

  onSubmit() {
    this.registerModel.email = this.email;
    this.registerModel.password = this.password;
    this.commonService.register(this.registerModel).subscribe((res) => {
      if (res != "Bu mail adresi daha önce kullanılmış") {
        this.gotoLogin();
      } else {
        this.ch.errorMessage(res);
      }
    })
  }

  gotoHomePage() {
    this.router.navigate(['/dashboard']);

  }

  gotoLogin() {
    this.router.navigate(['/login']);

  }

  register() {

  }

}

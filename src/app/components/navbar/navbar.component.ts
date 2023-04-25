import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonHelper } from '../helpers/common-helper';
import { CommonService } from 'app/shared/services/common.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    baskets: any[] = []
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    totalPrice = 0;

    constructor(location: Location, private element: ElementRef, private router: Router, public ch: CommonHelper, public commonService: CommonService) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });

        this.commonService.loginSubscription.subscribe((res) => {


            if (this.ch.isLoggedIn()) {
                this.totalPrice = 0;
                this.getAllBasketItem();
                this.commonService.basketItemSubscription.subscribe((res) => {
                    this.totalPrice = 0;
                    this.baskets = res;
                    this.baskets.forEach(element => {
                        this.totalPrice += element.productPrice;
                    });
                })
            }
        })
    }

    getAllBasketItem() {
        this.totalPrice = 0;
        this.commonService.getAllBasketItem(this.ch.currentUser.id).subscribe((res) => {
            this.baskets = res;
            this.baskets.forEach(element => {
                this.totalPrice += element.productPrice;
                console.log("🚀 ~ file: navbar.component.ts:63 ~ NavbarComponent ~ this.commonService.getAllBasketItem ~ this.totalPrice:", this.totalPrice)
            });
        })
    }


    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            if (toggleButton != undefined && toggleButton.classList != undefined) {
                toggleButton.classList.add('toggled');
            }
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        if (this.toggleButton != undefined && this.toggleButton.classList != undefined) {
            this.toggleButton.classList.remove('toggled');
        }
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Anasayfa';
    }


    logout() {
        localStorage.removeItem('user_info');
        this.ch.infoMessage("Çıkış yaptınız, birazdan giriş sayfasına yönlendirileceksiniz.");
        setTimeout(() => {
            window.location.href = this.ch.getUiUrl();
        }, 2000);
    }

    removeItem(id: number) {
        this.commonService.deleteBasketItem(id).subscribe((res) => {
            this.ch.successMessage(res);
            this.getAllBasketItem();
        })
    }

    deleteAllBasketItem() {
        this.commonService.allBasketProductDelete(this.ch.currentUser.id).subscribe((res) => {
            this.ch.successMessage(res);
            this.getAllBasketItem();
        })
    }
}

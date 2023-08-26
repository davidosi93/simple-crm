import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  visibility: any = true;
  visible: string = 'visibility';
  show: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  changeImg() {
    this.visibility = !this.visibility;
    this.show = !this.show;
    if (this.visibility) {
      this.visible = 'visibility';
    } else {
      this.visible = 'visibility_off';
    }
  }

}

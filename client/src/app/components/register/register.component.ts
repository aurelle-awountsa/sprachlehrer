import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      email: this.email,
      password: this.password
    };
  }
}
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  nome_utente: String;
  token;

  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.token = helper.decodeToken(window.localStorage.getItem('ai-token'));
    console.log(this.token);
    // this.nome_utente = this.token.user_name;
  }

}
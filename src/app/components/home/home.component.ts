import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  nome_utente: String = "generic_user";

  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();
    let token = helper.decodeToken(window.localStorage.getItem('ai-token'));
    console.log(token);
    this.nome_utente = token.user_name;
  }
}
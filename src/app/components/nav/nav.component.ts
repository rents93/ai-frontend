import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  title: String = 'GeoposApp';
  user: String;
  islogged: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService,
     private router: Router, private jwtService: JwtService) {}
  
  ngOnInit() {
    this.islogged = this.jwtService.ifLogged();
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['home']);
  }
  }

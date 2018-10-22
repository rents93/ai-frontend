import { Component, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt/jwt.service';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  title: String = 'GeoposApp';
  user: String;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService,
     private router: Router, private jwtService: JwtService) {
<<<<<<< HEAD
  }

  ngOnInit(): void {}

  logged(): boolean{
    return this.jwtService.ifLogged();
=======
    
  }

  ifLogged(){
    return this.jwtService.ifLogged();
  }

  ngOnInit() {
>>>>>>> 9be9327b982de36ced2a3aa15bab6cef67c21f3b
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['home']);
  }
}

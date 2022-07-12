
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

export class CanActivateService implements CanActivate {

  isAuthenticated : boolean;
  auth : Subscription;
  
  constructor(private authservice: AuthService, private router: Router) { }


 
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
   this.isAuthenticated= this.authservice.setAction();
    console.log(this.isAuthenticated)
   if(this.isAuthenticated){
     return true;
   }else{
     this.router.navigate(['/signin']);
     return false;
   }
  }
}

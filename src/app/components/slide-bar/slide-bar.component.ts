import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.css']
})
export class SlideBarComponent implements OnDestroy {
   sidebarSubscription: any;
  

  // isOpen = false;
  // private sidebarSubscription: Subscription;

  // constructor(private sidebarService: LoginServiceService) {
  //   this.sidebarSubscription = this.sidebarService.sidebarState$.subscribe(isOpen => {
  //     this.isOpen = isOpen;
  //   });
  // }

   ngOnDestroy(): void {
   this.sidebarSubscription.unsubscribe();
 }

  // getSidebarClass() {
  //   return {
  //     'open': this.isOpen,
  //     // Add more conditions for different classes based on other requirements
  //   };

  // }
}

 
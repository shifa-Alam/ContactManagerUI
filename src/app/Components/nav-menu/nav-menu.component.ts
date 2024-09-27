import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatSidenavContent,
    RouterModule,
    MatIcon,
    MatList,
    MatListItem,
    MatButtonModule
   

  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent implements OnInit,OnDestroy{
  fillerNav:string[]=[];
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  ngOnInit(): void {
    console.log( this.mobileQuery);
  }
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 400px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change",this._mobileQueryListener);
    this.fillerNav = [
      'contacts',
      'groups',
      "types"
    ];
  }
 

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change",this._mobileQueryListener);
  }


}

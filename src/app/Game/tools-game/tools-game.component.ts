import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_Services/Authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tools-game',
  templateUrl: './tools-game.component.html',
  styleUrls: ['./tools-game.component.css']
})
export class ToolsGameComponent implements OnInit {

  constructor(private router: Router,private auth: AuthenticationService) {

   }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["game", "login"]);
  }


}

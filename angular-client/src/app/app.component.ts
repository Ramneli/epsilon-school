import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService } from './auth-service/auth.service';

import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { AddHomeworksComponent } from './add-homeworks/add-homeworks.component';
import { UserService } from './user-service/user.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	private isLoggedIn: Boolean;
  private user_displayName: String;
  private user_email: String;
  private photo: String;

  public constructor(private titleService: Title,
                     public authService : AuthService,
                     private router: Router,
                     public dialog: MatDialog,
                    private userService : UserService) {

		this.authService.af.auth.onAuthStateChanged(
      (auth) => {
        if (auth == null) {
					this.router.navigate(['/']);
          this.authService.setLoginStatus(false);
					this.authService.setUserId("");
          this.isLoggedIn = false;
        } else {
          this.router.navigate['/homeworks'];
          this.authService.setLoginStatus(true);
					this.authService.setUserId(auth.uid);
          this.isLoggedIn = true;
          this.user_displayName = auth.displayName;
          this.user_email = auth.email;
          this.photo = auth.photoURL;
        }
      }
    )
	}

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
  	this.setTitle('epsilon-school');
  }

	login() {
    this.authService.loginWithGoogle().then((data) => {
      this.userService.getBlockStatus().subscribe(res => {
        if (res == 0) {
          this.router.navigate(['/homeworks']);
        } else {
          this.authService.logout().then(res => {
            alert("Your account has been disabled. For more info, please contact admin@epsilon.com");
          });
        }
      });
    });
  }
  logout() {
		this.router.navigate(['/']);
    this.authService.logout();
  }

  openAddSubjectDialog(): void {
    let dialogRef = this.dialog.open(CreateSubjectComponent, {
      width: '45%',
      height: '80%'
    });
    /*dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });*/
  }

  openAddHomeworkDialog(): void {
    let dialogRef = this.dialog.open(AddHomeworksComponent, {
      width: '45%',
      height: '92%'
    });
  }
}

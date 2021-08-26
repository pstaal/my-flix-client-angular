
import { Component, OnInit } from '@angular/core';


// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

user = {Username: '', Password: '', Email: '', Birthday: ''};

constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
    ) { }

ngOnInit(): void {
  this.getUser();
}

logOut(): void {
  this.snackBar.open('Logging out..', 'Ok', {
    duration: 2000,
  });
  localStorage.clear();
  this.router.navigate(['welcome']);
}

getUser(): void {
  this.fetchApiData.getUser().subscribe((result) => {
   console.log(result);
   this.user = { Username: result.Username, Password: 'Petertje', Email: result.Email, Birthday: result.Birthday };
  });
}

// This is the function responsible for sending the form inputs to the backend
editUser(): void {
    this.fetchApiData.editUser(this.user).subscribe((result) => {
  // Logic for a successful user registration goes here! (To be implemented)
  this.router.navigate(['welcome']);
  })

  }
}
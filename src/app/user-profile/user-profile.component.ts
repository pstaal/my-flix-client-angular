
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserProfileComponent implements OnInit {

user = {};

constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
  this.getUser;
}

getUser(): void {
  this.fetchApiData.getUser().subscribe((result) => {
// Logic for a successful user registration goes here! (To be implemented)
   this.user = result;
  });
}

// This is the function responsible for sending the form inputs to the backend
editUser(): void {
    this.fetchApiData.editUser(this.user).subscribe((result) => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     
     this.snackBar.open(result, 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  }
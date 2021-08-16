
import { Component, OnInit } from '@angular/core';


// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';



@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

user = {Username: '', Password: '', Email: '', Birthday: ''};

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
     console.log(result);
  }

  }
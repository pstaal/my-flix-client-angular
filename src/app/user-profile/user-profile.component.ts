
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
    ) { }

ngOnInit(): void {
  console.log('inside init before getuser', this.user);
  this.getUser();
  console.log('inside init after getuser', this.user);
}

getUser(): void {
  const Username = localStorage.getItem('user');
  console.log('the username for fetch', Username);
  this.fetchApiData.getUser(Username).subscribe((result) => {
// Logic for a successful user registration goes here! (To be implemented)
   console.log('result from fetch', result);
   this.user = result;
   console.log('inside getuser', this.user);
  });
}

// This is the function responsible for sending the form inputs to the backend
editUser(): void {
    this.fetchApiData.editUser(this.user).subscribe((result) => {
  // Logic for a successful user registration goes here! (To be implemented)
     console.log(result);
  })

  }
}
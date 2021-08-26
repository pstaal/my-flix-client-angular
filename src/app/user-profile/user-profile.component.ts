
import { Component, OnInit } from '@angular/core';


// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreView } from '../genre-view/genre-view.component';
import { Synopsisview } from '../synopsisview/synopsisview.component';
import { DirectorView } from '../director-view/director-view.component';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

user = {Username: '', Password: '', Email: '', Birthday: ''};
favoriteMovieIds: any[] = [];
movies: any[] = [];

constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
    ) { }

ngOnInit(): void {
  this.getUser();
  this.getFavMovies();
}

logOut(): void {
  this.snackBar.open('Logging out..', 'Ok', {
    duration: 2000,
  });
  localStorage.clear();
  this.router.navigate(['welcome']);
}

getGenre(genre: string): void {
  this.fetchApiData.getGenre(genre).subscribe((resp: any) => {
    this.dialog.open(GenreView, { data : {
      Name: genre,
      Description: resp
    }})
  });
}

getDirector(director: string): void {
  this.fetchApiData.getDirector(director).subscribe((resp: any) => {
    this.dialog.open(DirectorView, { data : {
      Name: resp.Name,
      Bio: resp.Bio,
      Birth: resp.Birth
    }})
  });
}

getSynopsis(synopsis: string): void {
    this.dialog.open(Synopsisview, { data : {
      Description: synopsis
    }})
}


getUser(): void {
  this.fetchApiData.getUser().subscribe((result) => {
   console.log(result);
   this.user = { Username: result.Username, Password: 'Petertje', Email: result.Email, Birthday: result.Birthday };
   this.favoriteMovieIds = result.FavoriteMovies;
  });
}

getFavMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
     let favs = this.favoriteMovieIds;
      this.movies = resp.filter(function (item: any) {
        return favs.indexOf(item._id) > -1;
      });
      return this.movies;
    });
  }

  deleteFavorite(movieID: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieID).subscribe((resp: any) => {
      this.snackBar.open('Removed from favorites!', 'Ok', {
        duration: 2000,
      });
      const index = this.favoriteMovieIds.indexOf(movieID);
      this.getFavMovies();
      return this.favoriteMovieIds.splice(index, 1);
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
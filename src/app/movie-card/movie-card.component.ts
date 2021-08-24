// src/app/movie-card/movie-card.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { DirectorView } from '../director-view/director-view.component';
import { GenreView } from '../genre-view/genre-view.component';
import { Synopsisview } from '../synopsisview/synopsisview.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
   movies: any[] = [];
   user: any = {};
   favoriteMovieIds: any[] = [];

  constructor (
  public fetchApiData: UserRegistrationService,
  public dialog: MatDialog,
  public snackBar: MatSnackBar,
  public router: Router
  )
  { }

ngOnInit(): void {
  this.getMovies();
  this.getUser();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        this.favoriteMovieIds = resp.FavoriteMovies;
        return this.user, this.favoriteMovieIds;
      });
    }
  
  logOut(): void {
    this.snackBar.open('Logging out..', 'Ok', {
      duration: 2000,
    });
    localStorage.clear();
    this.router.navigate(['welcome']);
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

getGenre(genre: string): void {
  this.fetchApiData.getGenre(genre).subscribe((resp: any) => {
    this.dialog.open(GenreView, { data : {
      Name: genre,
      Description: resp
    }})
  });
}

getSynopsis(synopsis: string): void {
    this.dialog.open(Synopsisview, { data : {
      Description: synopsis
    }})
}

isFavorite(movieID: string): boolean {
 return this.favoriteMovieIds.includes(movieID);
};

addFavorite(movieID: string): void {
  this.fetchApiData.addFavoriteMovie(movieID).subscribe((resp: any) => {
    this.snackBar.open('Added to favorites!', 'Ok', {
      duration: 2000,
    });
    return this.favoriteMovieIds.push(movieID);
  });

}

deleteFavorite(movieID: string): void {
  this.fetchApiData.deleteFavoriteMovie(movieID).subscribe((resp: any) => {
    this.snackBar.open('Removed from favorites!', 'Ok', {
      duration: 2000,
    });
    const index = this.favoriteMovieIds.indexOf(movieID);
    return this.favoriteMovieIds.splice(index, 1);
  });

}

}

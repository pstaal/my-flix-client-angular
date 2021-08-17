// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { DirectorView } from '../director-view/director-view.component';
import { GenreView } from '../genre-view/genre-view.component';
import { Synopsisview } from '../synopsisview/synopsisview.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  constructor (
  public fetchApiData: UserRegistrationService,
  public dialog: MatDialog )
  { }

ngOnInit(): void {
  this.getMovies();
  this.getUser();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
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

addFavorite(movieID: string): void {
  this.fetchApiData.addFavoriteMovie(movieID).subscribe((resp: any) => {
    console.log(resp);
  });

}

deleteFavorite(movieID: string): void {
  this.fetchApiData.deleteFavoriteMovie(movieID).subscribe((resp: any) => {
    console.log(resp);
  });

}

}

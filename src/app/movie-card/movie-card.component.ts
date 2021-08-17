// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { DirectorView } from '../director-view/director-view.component';
import { GenreView } from '../genre-view/genre-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor (
  public fetchApiData: UserRegistrationService,
  public dialog: MatDialog )
  { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
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

}

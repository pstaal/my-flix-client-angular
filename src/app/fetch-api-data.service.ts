import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://whispering-journey-40194.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    )
  }

  // Making the api call to get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call to get a single movie
  public getMovie(title: string): Observable<any> {
    console.log(title);
    return this.http.get(apiUrl + `movies/${title}`).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call to get information on a director
  public getDirector(Director: string): Observable<any> {
    console.log(Director);
    return this.http.get(apiUrl + `movies/director/${Director}`).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call to get information on a genre
  public getGenre(Genre: string): Observable<any> {
    console.log(Genre);
    return this.http.get(apiUrl + `movies/genre/${Genre}`).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call to get information about the users
  public getUsers(): Observable<any> {
    return this.http.get(apiUrl + 'users').pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call to get favorite movies of a user
  // There is no endpoint for this in my api

  //Add a movie to favorite movies
  public addFavoriteMovie(Username: string, movieID: string): Observable<any> {
    console.log(Username, movieID);
    return this.http.post(apiUrl + `users/${Username}/movies/${movieID}`, [Username, movieID]).pipe(
      catchError(this.handleError)
    );
  }

  //edit a user
  public editUser(user: {}): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${Username}`, user, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

   //get a user
   public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${Username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  //delete a user
  public deleteUser(Username: string): Observable<any> {
    console.log(Username);
    return this.http.delete(apiUrl + `users/${Username}`).pipe(
      catchError(this.handleError)
    );
  }

  //delete a movie from the favorites list
  public deleteFavoriteMovie(Username: string, MovieID: string): Observable<any> {
    console.log(Username, MovieID);
    return this.http.delete(apiUrl + `/users/${Username}/movies/${MovieID}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
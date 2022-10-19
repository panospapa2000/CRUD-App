import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../core/models/user';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class UserService {

  private usersUrl = 'http://onelity.azurewebsites.net/users';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService)
     { }

  /** GET original users from the server */
  getorgusers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getorgusers', []))
      );
  }
    /** GET Users from the server */
    getUsers(selectedoption: string, ascordesc:string, page: number, limit: number): Observable<User[]> {
      const url = `${this.usersUrl}/?_sort=${selectedoption}&_order=${ascordesc}&_page=${page}&_limit=${limit}`;
      return this.http.get<User[]>(url)
        .pipe(
          tap(_ => this.log('fetched users')),
          catchError(this.handleError<User[]>('getorgusers', []))
        );
    }

  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getHero id=${id}`))
    );
  }

  /* GET users whose last name contains search term */
  searchUsers(term: string, searchtype: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/?${searchtype}=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found users matching "${term}"`) :
         this.log(`no users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<User> {
    
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
      
    );
    
  }

/** PUT: update the user on the server */
updateUser(user: User): Observable<Object> {
  const url = `${this.usersUrl}/${user.id}`;
  return this.http.put(url, user, this.httpOptions).pipe(
    tap(_ => this.log(`updated user id=${user.id}`)),
    catchError(this.handleError<User>('updateUser'))
  );
}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: { message: string; }): Observable<T> => {
      alert(error.message)
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a User Service message with the MessageService */
  private log(message: string) {
    this.messageService.add(`User Service: ${message}`);
    
  }
}
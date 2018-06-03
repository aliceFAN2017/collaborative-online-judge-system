import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0
  lock = new Auth0Lock('TWsXgh-RKlpB4ylLJhC0CS-wsTd0PQpn', 'collaborativeonlinejudgesystem.auth0.com', {
    autoclose: true,
    auth: {
        redirectUrl: 'http://localhost:3000',
        responseType: 'token id_token'
    }
  });

  constructor(private http: Http) {}

  public login(): Promise<Object> {
    // Call the show method to display the widget
    return new Promise((resolve, reject) => {
      this.lock.show(this.lock.on('authenticated', authResult => {
            this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
              if (error) {
                reject(error);
              } else {
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('profile', JSON.stringify(profile));
                resolve(profile);
              }
            })
          }));
    });
  }

  public authenticated() {
    // Check if there's an unexpired jwt
    // This searches for an item in localStorage with key = 'id_token'
    return tokenNotExpired('id_token');
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
  }

  public getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  public resetPassword(): void {
    let profile = this.getProfile();
    let url: string = 'https://collaborativeonlinejudgesystem.auth0.com/dbconnections/change_password';
    let headers = new Headers({ 'content-type': 'application/json' });
    let body = {
                  client_id: 'TWsXgh-RKlpB4ylLJhC0CS-wsTd0PQpn',
                  email: profile.email,
                  connection: 'Username-Password-Authentication'
    };

    this.http.post(url, body, headers)
                .toPromise()
                .then((res: Response) => {
                  console.log(res.json())
                })
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error occurred', error);
    return Promise.reject(error.message || error);
  }
}

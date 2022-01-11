import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  public makeRequest() {
    this.http.get('assets/user.json').subscribe(
      (response: any) => {
        let user = { name: response.name, age: response.age };
      },
      (error) => {
        console.error(`ERROR: ${error}`);
      }
    );
  }
}

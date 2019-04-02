import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'spa';
    message$: Observable<Object>;
    constructor(private httpClient: HttpClient) {
        this.message$ = this.httpClient.get('/api/hello', {
            responseType: 'json'
        });
    }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import nanoid from 'nanoid';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    constructor(private router: Router) {}

    create() {
        const id = nanoid();
        this.router.navigate([`/list/${id}`]);
    }
}

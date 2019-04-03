import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, combineLatest } from 'rxjs';
import nanoid from 'nanoid';

export interface IList {
    items: Array<{
        item: string;
    }>;
}

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    list$: Observable<IList>;
    newItem = '';
    newItemsSubject = new Subject<{ item: string }>();
    constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
        const loadedItems: Observable<IList> = this.getListId().pipe(
            switchMap(
                (listId): Observable<IList> => {
                    return httpClient.get<IList>(`/api/list-items/${listId}`, {
                        responseType: 'json'
                    });
                }
            )
        );
        this.list$ = combineLatest(
            loadedItems,
            this.newItemsSubject.pipe(startWith(undefined))
        ).pipe(
            map(args => {
                const [list, newItem] = args;
                if (newItem) {
                    list.items.push(newItem);
                }
                return list;
            })
        );
    }

    ngOnInit() {}
    add(item: string) {
        const itemId = nanoid();
        return this.getListId()
            .pipe(
                switchMap(listId => {
                    return this.httpClient.post(
                        `/api/add-item/${listId}/${itemId}`,
                        { item }
                    );
                })
            )
            .subscribe(() => {
                this.newItemsSubject.next({ item });
                this.newItem = '';
            });
    }

    private getListId(): Observable<string> {
        return this.route.paramMap.pipe(
            map(params => {
                const listId = params.get('listId');
                if (!listId) {
                    throw new Error('Missing listId');
                }
                return listId;
            })
        );
    }
}

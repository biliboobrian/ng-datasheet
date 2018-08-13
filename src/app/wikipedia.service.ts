import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*',
    limit: '500'
  }
});

@Injectable({
  providedIn: 'root'
})

export class WikipediaService {
  constructor(private http: HttpClient) { }

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http.get(WIKI_URL, { params: PARAMS.set('search', term) }).pipe(
      map(response => {
        const dataSet: Array<object> = [];

        for (let index = 0; index < response[1].length; index++) {
          dataSet.push(
            {
              name: response[1][index],
              descr: response[2][index],
              link: response[3][index]

            }
          );
        }
        return dataSet;
      })
    );
  }
}

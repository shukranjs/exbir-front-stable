import { Injectable } from '@angular/core';
import {Article} from "../entities/article";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService: ApiService) { }
  add(article: Article) {
    return this.apiService.post('/article',  article);
  }
  update(article: Article) {
    return this.apiService.put('/article',  article);
  }
  getAll() {
    return this.apiService.get('/articles');
  }
  getById(id: string) {
    return this.apiService.get('/article/' + id);
  }
}

import {Component, OnInit} from '@angular/core';
import {Article} from "../entities/article";
import {ArticleService} from "../services/article.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getAll().subscribe((data: Article[]) => this.articles = data);
  }

}

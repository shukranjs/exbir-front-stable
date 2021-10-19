import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../services/article.service";
import {Article} from "../entities/article";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  id: string;
  article: Article = new Article();

  constructor(private route: ActivatedRoute, private articleService: ArticleService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.articleService.getById(this.id).subscribe((data: Article) => this.article = data);
  }
}

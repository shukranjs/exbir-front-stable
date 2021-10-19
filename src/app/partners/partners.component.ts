import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-partners",
  templateUrl: "./partners.component.html",
  styleUrls: ["./partners.component.css"],
})
export class PartnersComponent implements OnInit {
  images1 = [
    {
      source: "assets/images/client1.jpg",
      href: "https://www.defacto.com.tr/",
    },
    {
      source: "assets/images/client2.jpg",
      href: "https://www.lcwaikiki.com/tr-TR/TR",
    },
    {
      source: "assets/images/client3.jpg",
      href: "https://www.n11.com/",
    },
    {
      source: "assets/images/client4.jpg",
      href: "https://www.trendyol.com/",
    },
  ];

  images2 = [
    {
      source: "assets/images/client5.jpg",
      href: "https://tr.uspoloassn.com/",
    },
    {
      source: "assets/images/client6.jpg",
      href: "https://www.koton.com/tr/",
    },
    {
      source: "assets/images/client7.jpg",
      href: "https://www.colins.com.tr/",
    },
    {
      source: "assets/images/client8.jpg",
      href: "https://www.zara.com/tr/",
    },
  ];

  images3 = [
    {
      source: "assets/images/client9.jpg",
      href: "https://www.flo.com.tr/",
    },
  ];

  constructor() {}

  ngOnInit() {}
}

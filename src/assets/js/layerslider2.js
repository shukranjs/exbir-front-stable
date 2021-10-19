$(document).ready(function () {
  "use strict";
  $("#layerslider").layerSlider({
    responsive: true,
    responsiveUnder: 1170,
    layersContainer: 1170,
    skin: 'v5',
    hoverPrevNext: true,
    navPrevNext: true,
    navStartStop: false,
    navButtons: false,
    skinsPath: 'layerslider/skins/'
  });
  $("#customers-review-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 2000,
    loop: false,
    dots: false,
    nav: true,
    margin: 0,
    items: 1,
    singleItem: true,
    responsiveClass: true,
    responsive: {
      0: {
        nav: false
      },
      900: {
        nav: true
      }
    }
  });
  $("#modern-services-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 2000,
    loop: false,
    dots: false,
    nav: true,
    margin: 30,
    items: 3,
    responsiveClass: true,
    responsive: {
      1200: {items: 3},
      980: {items: 2},
      480: {items: 2},
      0: {items: 1}
    }
  });
  $('#toggle .content').hide();
  $('#toggle h3:first').addClass('active').next().slideDown(500).parent().addClass("activate");
  $('#toggle h3').on("click", function () {
    if ($(this).next().is(':hidden')) {
      $('.toggle h3').removeClass('active').next().slideUp(500).removeClass('animated zoomIn').parent().removeClass("activate");
      $(this).toggleClass('active').next().slideDown(500).addClass('animated zoomIn').parent().toggleClass("activate");
      return false;
    }
  });
});

(function ($) {
  "use strict";

  $("select").selectize();

  $(".student-city__item").on("click", function () {
    $(".student-city__item.active").removeClass("active");
    $(this).addClass("active");

    let gallery = $(this).attr("data-gallery");

    $(".gallery.active").removeClass("active");
    $('.gallery[data-gallery="' + gallery + '"]').addClass("active");
  });

  $(".stories__slider-full").on("click", function () {
    $(this).prev().addClass("active");
    $(".stories__slider").slick("refresh");
  });

  // $('.offer-screen__btn--white').on('click', function () {
  //   let top = $("#napravlenie").offset().top;
  //   $('body,html').animate({scrollTop: top}, 1500);

  // });

  $(".choose__btn").on("click", function () {
    let napr = $(".choose__cat.active .choose__item.active").text();
    let $select = $('select[name="napravlenie"]').selectize();
    let selectize = $select[0].selectize;

    selectize.setValue(napr);
  });

  $(".help-me").on("click", function () {
    $(this).toggleClass("active");
  });

  $(".categories__item").on("click", function () {
    $(".categories__item.active").removeClass("active");
    $(this).addClass("active");

    let cat = $(this).attr("data-choose");

    $(".choose__cat.active").removeClass("active");
    $(`.${cat}`).addClass("active");
  });

  $(".choose__item").on("click", function () {
    $(this)
      .closest(".choose__cat")
      .find(".choose__item.active")
      .removeClass("active");
    $(this).addClass("active");
  });

  let sliderIsLive = false;

  function sliderMob() {
    if (window.innerWidth <= 1200) {
      if (!sliderIsLive) {
        if (!$(".steps__list").hasClass("slick-slider")) {
          $(".steps__list").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
          });
          sliderIsLive = true;
        }
      }
      sliderIsLive = false;
    } else {
      if ($(".steps__list").hasClass("slick-slider")) {
        $(".steps__list").slick("unslick");
      }
      sliderIsLive = false;
    }
  }

  let sliderIsLive2 = false;

  function sliderMob2() {
    if (window.innerWidth <= 744) {
      if (!sliderIsLive2) {
        if (
          !$(".tabs__nav").hasClass("slick-slider") &&
          !$(".tabs__content-wrap").hasClass("slick-slider")
        ) {
          $(".tabs__content-wrap").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            asNavFor: ".tabs__nav",
          });

          $(".tabs__nav").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            asNavFor: ".tabs__content-wrap",
          });
        }

        sliderIsLive2 = true;
      }
      sliderIsLive2 = false;
    } else {
      if (
        $(".tabs__nav").hasClass("slick-slider") &&
        $(".tabs__content-wrap").hasClass("slick-slider")
      ) {
        $(".tabs__content-wrap").slick("unslick");
        $(".tabs__nav").slick("unslick");
      }
      sliderIsLive2 = false;
    }
  }

  sliderMob();
  sliderMob2();

  window.addEventListener("resize", function () {
    sliderMob();
    sliderMob2();
  });

  $(".stories__slider").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: true,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".tabs__nav-item").on("click", function () {
    $(".tabs .tabs__nav-item--active").removeClass("tabs__nav-item--active");
    $(this).addClass("tabs__nav-item--active");

    let id = $(this).attr("data-tab");

    $(".tabs .tabs__content--active").removeClass("tabs__content--active");
    $('.tabs__content[data-tab="' + id + '"]').addClass(
      "tabs__content--active"
    );
  });

  $(".show-popup").on("click", function (e) {
    e.preventDefault();
    let scrollWidth = window.innerWidth - $(document).width();
    let popup = $(this).attr("data-popup");
    let body = $("body");
    body.addClass("no-scroll");
    body.css("padding-right", scrollWidth);
    $(".popup__content.active").removeClass("active");
    $(".popup, .popup__content--" + popup).addClass("active");
  });

  $(".popup, .popup__close").on("click", function () {
    let body = $("body");
    $(".popup").removeClass("active");
    body.removeClass("no-scroll");
    body.css("padding-right", 0);
  });

  $(".popup__content").on("click", function (e) {
    e.stopPropagation();
  });

  // $('input[type="tel"]').inputmask('+9(999)999-99-99-99');

  $("form").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      url: "./send.php",
      type: "POST",
      dataType: "html",
      data: $(this).serialize(),
      success: function (response) {
        console.log(response);
        $(".popup__content.active").removeClass("active");
        $(".popup, .popup__content--thanks").addClass("active");
      },
      error: function (response) {
        console.log(response);
      },
    });
  });

  ////// конвертит img в svg ////////
  $("img.svg").each(function () {
    let $img = jQuery(this),
      imgID = $img.attr("id"),
      imgClass = $img.attr("class"),
      imgURL = $img.attr("src"),
      imgWidth = $img.attr("width"),
      imgHeight = $img.attr("height");

    $.get(
      imgURL,
      function (data) {
        let $svg = jQuery(data).find("svg");
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        if (typeof imgWidth !== "undefined") {
          $svg = $svg.attr("width", imgWidth);
        }
        if (typeof imgHeight !== "undefined") {
          $svg = $svg.attr("height", imgHeight);
        }
        $svg = $svg.removeAttr("xmlns:a");
        $img.replaceWith($svg);
      },
      "xml"
    );
  });

  // раскрытие popup contact-us при нажатии
  $(".steaky-contacts-minimized").on("click", function () {
    $(".steaky-contacts").addClass("visible");
  });

  // скрываем popup contact-us при нажатии по body
  $(document).mouseup(function (e) {
    // событие клика по веб-документу
    var steakyWindow = $(".steaky-contacts");
    if (!steakyWindow.is(e.target) && steakyWindow.has(e.target).length === 0) {
      $(".steaky-contacts").removeClass("visible");
    }
  });
})(jQuery);

$(function () {
  // Slick Sliderの設定
  $(".slider").slick({
    autoplay: true,
    autoplaySpeed: 0,
    speed: 10000,
    cssEase: "linear",
    slidesToShow: 10,
    swipe: false,
    arrows: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    responsive: [{ breakpoint: 750, settings: { slidesToShow: 3 } }],
  });

  // ScrollMagicコントローラーの設定
  var controller = new ScrollMagic.Controller();

  // ScrollMagicトゥイーンの設定
  ["2", "3"].forEach(function (i) {
    var tween = gsap.to(".concept-img-" + i, {
      duration: 1,
      opacity: 1,
      x: 0,
      ease: "power4.out",
    });
    new ScrollMagic.Scene({
      triggerElement: ".concept-img-" + i,
      reverse: false,
      triggerHook: 0.5,
      offset: 50,
    })
      .setTween(tween)
      .addTo(controller);
  });

  // Reasonエリアのアニメーション設定
  $(window).on("scroll", function () {
    var offset;
    if ($(window).width() <= 750) {
      offset = -700; // スマホ時にはオフセットを0に
    } else {
      offset = 200; // それ以外の画面サイズではオフセットを200に
    }

    $(".reason-area > .flex > div").each(function (index, element) {
      var elementTop = $(element).offset().top + offset; // offsetを加算
      var viewportBottom = $(window).scrollTop() + $(window).height();
      if (elementTop < viewportBottom) {
        gsap.to(element, {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "power4.out",
          delay: index * 0.5,
        });
      }
    });
  });

  // Strengthsエリアのアニメーション設定
  $(document).ready(function () {
    $(".strengths-area > .flex > div:nth-child(2) img").each(function (
      index,
      element
    ) {
      gsap.set(element, { opacity: 0, x: "100%" });
    });

    $(window).on("scroll", function () {
      var offset, duration;

      if ($(window).width() <= 768) {
        offset = -100;
        duration = 0.5;
      } else {
        offset = 200;
        duration = 1;
      }

      $(".strengths-area > .flex > div:nth-child(2) img").each(function (
        index,
        element
      ) {
        var elementTop = $(element).offset().top + offset;
        var viewportBottom = $(window).scrollTop() + $(window).height();

        if (elementTop < viewportBottom && !$(element).hasClass("animated")) {
          gsap.to(element, {
            duration: duration,
            opacity: 1,
            x: "0%",
            ease: "power4.out",
          });
          $(element).addClass("animated");
        }
      });
    });
  });
});

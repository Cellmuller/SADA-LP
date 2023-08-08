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
  $(window).on("scroll", function () {
    $(".strengths-area > .flex > div:nth-child(2) img").each(function (
      index,
      element
    ) {
      var offset, duration;

      if ($(window).width() <= 750) {
        offset = -100; // オフセットを0に設定
        duration = 0.5; // アニメーションの持続時間を短く設定
      } else {
        offset = 200; // オフセットを200に設定
        duration = 1; // アニメーションの持続時間を1秒に設定
      }

      var elementTop = $(element).offset().top + offset;
      var viewportBottom = $(window).scrollTop() + $(window).height();

      if (elementTop < viewportBottom && !$(element).hasClass("animated")) {
        gsap.to(element, {
          duration: duration, // ここで持続時間を使用
          opacity: 1,
          x: "0%", // 元の位置に戻す
          ease: "power4.out",
        });
        $(element).addClass("animated");
      }
    });
  });
});

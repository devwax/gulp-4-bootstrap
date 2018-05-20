// jQuery: Wait until document has loaded before executing.
$(document).ready(() => {

  // Edit Settings
  var options = {
    to_email: 'Sitename@localhost', // you@youremail.com
    smooth_mousewheel_scroll: false
  }

  // Preload: Fade in images when they are loaded
  // $('#hero').css("opacity", 1);

  // Handle on mouse scroll functions (sticky navbar behaviour, close lightboxes, etc)
  on_scroll();
  $(window).scroll(on_scroll);

  // Smooth Page Scroll
  if (options.smooth_mousewheel_scroll) {
    $(window).on("mousewheel DOMMouseScroll", smooth_mousewheel_scroll);
  }

  // $('#togglesc').on('click', function (e) {
  //   e.preventDefault();
  //   if (options.smooth_mousewheel_scroll) {
  //     $(window).off("mousewheel DOMMouseScroll", smooth_mousewheel_scroll);
  //     options.smooth_mousewheel_scroll = false;
  //   } else {
  //     $(window).on("mousewheel DOMMouseScroll", smooth_mousewheel_scroll);
  //     options.smooth_mousewheel_scroll = true;
  //   }
  // });

  // Animated fade in effects
  // https://github.com/michalsnik/aos
  // AOS.init();

  // $('.owl-carousel').owlCarousel({
  //   margin: 12
  // });

  // Search box toggler
  // $('#search-box .fa-search').on('click', toggle_search_box);

  // // Image Rotator - Source: http://jsfiddle.net/jtbowden/UNZR5/1/
  // $(() => {
  //     $('#fader img:not(:first)').hide();
  //     $('#fader img').css({ position: 'absolute', top: 0, left: 0 });
  //
  //     let pause = false;
  //
  //     function fadeNext() {
  //         $('#fader img').first().stop().fadeOut().appendTo($('#fader'));
  //         $('#fader img').first().stop().fadeIn();
  //     }
  //
  //     function fadePrev() {
  //         $('#fader img').first().stop().fadeOut();
  //         $('#fader img').last().stop().prependTo($('#fader')).fadeIn();
  //     }
  //
  //     $('#next').click(() => {
  //         fadeNext();
  //     });
  //
  //     $('#prev').click(() => {
  //         fadePrev();
  //     });
  //
  //     $('#fader, .button').hover(() => pause = !pause)
  //
  //     function doRotate() {
  //       if(!pause) {
  //         fadeNext();
  //       }
  //     }
  //
  //     var rotate = setInterval(doRotate, 4000);
  // });

  // // Submit reservations form
  // $('#book-reervation-button').on('click', e => {
  //   const form = $('#reservations-modal-form.needs-validation').get(0);
  //   form.classList.add('was-validated');
  //   const form_is_valid = form.checkValidity();
  //   console.log('form_is_valid:', form_is_valid);
  //
  //   // Form validation passed
  //   if (form_is_valid) {
  //     // Allow link to be clicked with mailto: string in href
  //     // (i.e. do nothing)
  //
  //   // Form validation failed
  //   } else {
  //     // Prevent link action and allow validation messages to display until valid.
  //     e.preventDefault();
  //   }
  // })

  // Update form email link href
  // $('#reservations-modal-form').on('keyup', e => {
  //   // generate / udpate href link in submit link / button
  //   generateFormEmailLink('#book-reervation-button', options.to_email, 'New Reservation');
  // })

  // Date picker
  // https://www.malot.fr/bootstrap-datetimepicker/
  // https://github.com/AuspeXeu/bootstrap-datetimepicker
  // $(".form_datetime").datetimepicker({
  //   format: "dd MM yyyy - HH:ii P",
  //   showMeridian: true,
  //   autoclose: true,
  //   todayBtn: true
  // });
  //
  // $('.fluidbox').fluidbox().fluidbox('bindListeners');

  // $('#below-the-fold i').on('click', e => {
  //   e.preventDefault();
  //   TweenLite.to(window, 0.5, {scrollTo: ($(window).height() - 170)});
  // });

  // Auto scrollTo link fragments
  // $('a[href^="#"]').on('click', e => {
  //   var target = $(e.target).attr('href');
  //   var offset = 0;
  //   if ($('body').hasClass('sticky-navbar')) {
  //     offset = $('#navbar-top').height();
  //   }
  //   $('body').scrollTo(target, 200, {offset: -offset});
  // });

  // Disable empty links
  // $('a[href=""]').on('click', e => e.preventDefault())

 // new _______________________

//  $('.owl-carousel').owlCarousel({
//     loop:true,
//     margin:10,
//     responsiveClass:true,
//     responsive:{
//         0:{
//             items:1,
//             nav:true
//         },
//         600:{
//             items:3,
//             nav:false
//         },
//         1000:{
//             items:1,
//             nav:true,
//             loop:false
//         }
//     }
// })


  var swiper = new Swiper('.swiper-container', {
    speed: 1100,
    parallax: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  $('.jarallax').jarallax({
    speed: 0.2
  });


});
// END: document.ready()
// Any code that relies on the document elements to be ready
// should go above the end of document.ready().



// Smooth Page Scrolling
function smooth_mousewheel_scroll(event) {
  var $window = $(window);
  if ( $('body').hasClass('modal-open') ) {
    $window = $('.modal');
  }
  var scrollTime = 0.15;
  var scrollDistance = 55;

  event.preventDefault();

  var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
  var scrollTop = $window.scrollTop();
  var finalScroll = scrollTop - parseInt(delta*scrollDistance);

  TweenLite.to($window, scrollTime, {
    scrollTo : { y: finalScroll, autoKill:true },
      ease: Power1.easeOut,
      overwrite: 5
    });
};

function on_scroll() {

  // // Handle top navbar scroll height changes when using .sticky-navbar
  // // Add '.sticky-navbar' class to body to make navbar fixed / sticky.
  // if ($('body').hasClass('sticky-navbar')) {
  //   $('#header nav.navbar').addClass('fixed-top');
  // }
  //
  // // Display light or dark logo depending on navbar light or dark classes
  // if ($('#header nav.navbar').hasClass('navbar-dark')) {
  //   $('#header nav.navbar a.logo-light').addClass('d-inline-block');
  //   $('#header nav.navbar a.logo-light').removeClass('d-none');
  //   $('#header nav.navbar a.logo-dark').addClass('d-none');
  //   $('#header nav.navbar a.logo-dark').removeClass('d-inline-block');
  // } else if ($('#header nav.navbar').hasClass('navbar-light')) {
  //   $('#header nav.navbar a.logo-dark').addClass('d-inline-block');
  //   $('#header nav.navbar a.logo-dark').removeClass('d-none');
  //   $('#header nav.navbar a.logo-light').addClass('d-none');
  //   $('#header nav.navbar a.logo-light').removeClass('d-inline-block');
  // }

  // if ($('body').hasClass('transparent-navbar')) {
  //   if ($(window).scrollTop() < 60) {
  //
  //     // Add '.transparent-navbar' class to body to use navbar transparency
  //     if ($('body').hasClass('transparent-navbar')) {
  //       $('#header nav.navbar').addClass('bg-transparent');
  //     }
  //
  //     // Add '.sticky-navbar' class to body to make navbar fixed / sticky.
  //     if ($('body').hasClass('sticky-navbar')) {
  //       $('#header nav.navbar').addClass('fixed-top');
  //     }
  //
  //     $('#header nav.navbar').addClass('navbar-dark bg-dark');
  //     $('#header nav.navbar').removeClass('navbar-light bg-light');
  //
  //     $('#header nav.navbar a.logo-light').addClass('d-inline-block');
  //     $('#header nav.navbar a.logo-light').removeClass('d-none');
  //     $('#header nav.navbar a.logo-dark').addClass('d-none');
  //     $('#header nav.navbar a.logo-dark').removeClass('d-inline-block');
  //
  //     $('#below-the-fold').removeClass('d-none');
  //
  //   } else if ($(window).scrollTop() > 60) {
  //     $('#header nav.navbar').addClass('navbar-light bg-light');
  //     $('#header nav.navbar').removeClass('navbar-dark bg-dark bg-transparent');
  //
  //     $('#header nav.navbar a.logo-light').addClass('d-none');
  //     $('#header nav.navbar a.logo-light').removeClass('d-inline-block');
  //     $('#header nav.navbar a.logo-dark').addClass('d-inline-block');
  //     $('#header nav.navbar a.logo-dark').removeClass('d-none');
  //     $('#below-the-fold').addClass('d-none');
  //   }
  // }

  // Close fluidbox image lightbox on scroll
  // $('.fluidbox').fluidbox().fluidbox('close');

  // // On fluidbox open start
  // $('.fluidbox').on('openstart.fluidbox', e => {
  //   $('.owl-item').css('visibility', 'hidden');
  //   $('.owl-item').each(function(i, el){
  //     if ($(el).has('.fluidbox--opened').length > 0) {
  //       $(el).css('visibility', 'visible');
  //     }
  //   })
  //   $('.owl-stage-outer').css('overflow', 'visible');
  //   $('.navbar').fadeOut(700);
  //   $('body').addClass('overflow-x-hidden')
  // })
  //
  // // On fluidbox close end
  // $('.fluidbox').on('closeend.fluidbox', e => {
  //   $('.owl-item').css('visibility', 'visible');
  //   $('.owl-stage-outer').css('overflow', 'hidden');
  //   // $('.navbar').fadeIn(700);
  //   $('body').removeClass('overflow-x-hidden');
  // })
  //
  // // On fluidbox close start
  // $('.fluidbox').on('closestart.fluidbox', e => {
  //   $('.navbar').fadeIn(700);
  // })

}

// // Remove transparent background when mobile nav is ** shown **
// $('#navbarSupportedContent').on('shown.bs.collapse', function () {
//   // console.log('show.bs.collapse');
//   $('#navbar-top').removeClass('bg-transparent');
// })
//
// // Add transparent background when mobile nav is ** hidden **
// // and the window hasn't been scrolled down more than 60px
// $('#navbarSupportedContent').on('hidden.bs.collapse', function () {
//   // console.log('hidden.bs.collapse');
//   if ( $('body').hasClass('transparent-navbar') ) {
//     if ($(window).scrollTop() < 60) $('#navbar-top').addClass('bg-transparent');
//   }
// })


// function toggle_search_box() {
//   if ($('#search-box').hasClass('active')) {
//     $('#search-box').removeClass('active');
//     $('#search-box .form-control').css({opacity: 0}).blur();
//   } else {
//     $('#search-box').addClass('active');
//     $('#search-box .form-control').css({opacity: 1}).focus();
//   }
// }

// $(document).keyup(function(e) {
//    if (e.keyCode == 27) { // ESC key pressed
//      // Search box
//     if ($('#search-box').hasClass('active')) {
//       toggle_search_box();
//     }
//
//     // Close fluidbox images that are open
//     $('a.fluidbox').trigger('close.fluidbox');
//   }
// });

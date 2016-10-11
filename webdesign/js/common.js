if(!Modernizr.objectfit) {
  $('.content__item').each(function() {

    var $container = $(this),
        imgUrl = $container.find('img').prop('src');

    if(imgUrl) {
      $container.css('backgroundImage', 'url(' + imgUrl + ')')
                .addClass('compat-object-fit');
    }
  });
}

$(function() {

  if ($('.toggle__menu').is('.is_active')) {
    $('.main__menu').show();
  } else {
    $('.main__menu').hide();
  }

  $('.toggle__menu').click(function() {
    $('.toggle__menu').toggleClass('is_active');
    if ($('.toggle__menu').is('.is_active')) {
      $('.main__menu').show(200);
    } else {
      $('.main__menu').hide(200);
    }
  });

});

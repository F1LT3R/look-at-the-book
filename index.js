
  addEventListener('load', function () {
    console.log(window.innerHeight);
    lab.height=(window.innerHeight-100)+'px';
  });


  $('.color').click(function(elem){
    var $elem = $(this);
    var color = $elem.css('backgroundColor');
    console.log(color, this.className);

    lab.contentWindow.updateColor(color);
    $('.color').removeClass('selected');
    $elem.addClass('selected');
  });
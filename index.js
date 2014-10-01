
  addEventListener('load', function () {
    // console.log(window.innerHeight);
    lab.height=(window.innerHeight-100)+'px';
  });


  $('.brush').click(function(elem){
    var $elem = $(this);
    $('.brush').removeClass('selected');
    $elem.addClass('selected');
  });


  $('.brush.color').click(function(elem){
    var $elem = $(this);
    var color = $elem.css('backgroundColor');
    // console.log(color, this.className);
    lab.contentWindow.updateMode('paint');
    lab.contentWindow.updateColor(color);
  });

  $('.brush.eraser').click(function(elem){
    lab.contentWindow.updateMode('erase');
  });
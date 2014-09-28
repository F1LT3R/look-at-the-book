
  addEventListener('load', function () {
    console.log(window.innerHeight);
    lab.height=(window.innerHeight-100)+'px';
  });


  $('.color').click(function(){
    var color = this.className.split(' ')[0];
    lab.contentWindow.updateColor(color);
    $('.color').removeClass('selected');
    $(this).addClass('selected');
  });
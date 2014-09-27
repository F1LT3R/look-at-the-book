(function(){



  var settings = {
      background: "#000"
    , textColor: "#FF0"
    , scriptureServicePath: "http://labs.bible.org/api/?passage="
    , scriptureServiceOpts: "&type=json"
    , defaultScripture: "John%203:16-17"
  };

  var docElem = document.documentElement
    , width =  0
    , height =  0
    , context = paint.getContext('2d')
    ;


  function formatScripture(e){
    var scriptureMarkup = '<h1>'+unescape(settings.defaultScripture)+'</h1> ';

    e.forEach(function(scripture){
      scriptureMarkup+='<p><sup>'+scripture.verse+'</sup> <span>'+scripture.text+'</span></p>'
    });
    // console.log(scriptureMarkup);
    text.innerHTML = scriptureMarkup;
    setupCanvas();
  }

  function getScripture(){
    var url = settings.scriptureServicePath + settings.defaultScripture + settings.scriptureServiceOpts;
    
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(e){
        formatScripture(e);
      }
    });

    
    // text.innerHTML = '<h1></h1><sup>16</sup> <span>For this is the way God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life.</span> <sup>17</sup> <span>For God did not send his Son into the world to condemn the world, but that the world should be saved through him. <a target="_blank" href="http://bible.org/page.php?page_id=3537">&copy;NET</a></span>';
  }
  

  function setupCanvas(){
    width =  docElem.offsetWidth;
    height =  docElem.offsetHeight;
    paint.width = width;
    paint.height = height;
    console.log(context);
  }


  function initialize () {
    getScripture();
  }

  var mouseDown=false
    , lastMouseX=0
    , lastMouseY=0
    , mouseX=0
    , mouseY=0
    ;
  

  function onTimer(){
    if (mouseDown){
      context.strokeStyle = "#FF0";
      context.lineWidth = "6";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.beginPath();
      context.moveTo(lastMouseX, lastMouseY+window.scrollY);
      context.lineTo(mouseX, mouseY+window.scrollY);
      context.closePath();
      context.stroke();
    }
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

  var timer = setInterval(onTimer, 30);

  function movemouse(e){
    mouseX = e.x;
    mouseY = e.y;
  }

  function mousedown(e){
    mouseDown = true;
  }

  function mouseup(e){
    saveState();
    mouseDown = false;
  }


  window.exportDoodle = function(){
    console.log( paint.toDataURL() );
  }


  var savedStates = []
    , maxUndos = 10
    ;
  
  function saveState(){

    if (savedStates.length >= maxUndos) {
      // Remove the first state from the stack
      savedStates.shift();
    }
    savedStates.push(context.getImageData(0, 0, width, height)) 
    // console.log(savedStates);
    // console.log('Saved State');
  }

  function undo(){
    if (savedStates.length > 0) {
      var lastState = savedStates.pop();
    }
    
    context.clearRect(0, 0, width, height);
    
    if (lastState) {
    context.putImageData(lastState, 0, 0);
    }
  }

  function keyup (e) {
    console.log(e.keyCode);
    if (e.keyCode === 85) {
      undo();
    }
  }

  addEventListener('load', initialize);
  addEventListener('mousemove', movemouse);
  addEventListener('mousedown', mousedown);
  addEventListener('mouseup', mouseup);
  addEventListener('keyup', keyup);



}());
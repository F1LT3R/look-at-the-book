(function(){

  // Mode ENUMS
  var PAINT = 1
    , ERASE = 2
    ;

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
    , highlightColor = "yellow"
    , mode = PAINT
    ;



  // OuterDocument Interfaces
  window.updateColor = function(color){
      highlightColor = color;      
    }

  window.updateMode = function(newMode){
    switch (newMode) {
      case 'paint':
        mode = PAINT;
        break;
      case 'erase':
        mode = ERASE;
        break;
    }
  }

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
    
    // $.ajax({
    //   url: url,
    //   dataType: 'jsonp',
    //   success: function(e){
    //     formatScripture(e);
    //   }
    // });

    // text.innerHTML = '<h1>John 3:16-17</h1> <p><sup>16</sup> <span>For this is the way God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life.</span></p><p><sup>17</sup> <span>For God did not send his Son into the world to condemn the world, but that the world should be saved through him. <a style="" target="_blank" href="http://bible.org/page.php?page_id=3537">&copy;NET</a></span></p>';
    text.innerHTML = '<h1>Romans 8:26-27</h1> <p><sup>26</sup> Likewise the Spirit helps us in our weakness. For we do not know what to pray for as we ought, but the Spirit himself intercedes for us with groanings too deep for words.</p> <p><sup>27</sup>And he who searches hearts knows what is the mind of the Spirit, because the Spirit intercedes for the saints according to the will of God. </p>';
    setupCanvas();
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
    if (mouseDown && mode == PAINT){
      context.strokeStyle = highlightColor;
      context.lineWidth = "6";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.beginPath();
      context.moveTo(lastMouseX, lastMouseY + window.scrollY);
      context.lineTo(mouseX, mouseY + window.scrollY);
      context.closePath();
      context.stroke();
    }

    if (mouseDown && mode == ERASE){
      context.clearRect(mouseX-24, (mouseY-24)+window.scrollY, 48, 48);
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
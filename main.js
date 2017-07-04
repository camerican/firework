var player;
document.addEventListener("DOMContentLoaded",()=>{
  // play some sweet tunes
  SC.initialize({
    client_id: 'fd4e76fc67798bfa742089ed619084a6'
  });
  SC.stream('/tracks/110394919').then((player) => {
    window.player = player;
    player.play();
    setTimeout(()=>player.seek(38000),500);
  });
  // and show the showcase
  let fireworks = 100;
  let intervalId = setInterval(() => {
    //console.log( window.player.volume )
    // stop the show if we've finished our fireworks up
    if( !fireworks ) { 
      clearInterval(intervalId);
      let volControl = setInterval(() => {
        if( window.player.getVolume() <= 0 ) { 
          clearInterval(volControl);
          window.player.pause();
        }
        window.player.setVolume(window.player.getVolume() - 0.1);
      },100);
    }
    // store a reference to our new firework
    let el = firework();
    // append the firework to the DOM
    document.body.appendChild(el);
    // decrease the number of available fireworks
    fireworks--;
    // wipe out our firework element after 3 seconds
    setTimeout( () => {
      el.parentNode.removeChild(el);
    }, 3000 );
  }, 250 );
});

// Our firework creation function
function firework(){
  let x = Math.floor( Math.random() * innerWidth ),
      y = Math.floor( Math.random() * innerHeight ),
      color = ( f => "rgb(" + f() + ", " + f() + "," + f() + ")" )(() => Math.floor( Math.random() * 255 )),
      el = document.createElement("div");
      el.className = 'firework';
      el.style.backgroundColor = color;
      el.style.top = y + "px";
      el.style.left = x + "px";
  return el;
}
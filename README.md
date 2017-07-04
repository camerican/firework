# Firework Demo

![](https://github.com/camerican/firework/blob/master/screengrab.png)

## Happy 4th of July!  

This demo combines the creation of elements via JavaScript within an interval with animated CSS Keyframes and the background playing of a SoundCloud song, three things we learn within the Web Development Intensive at the New York Code + Design Academy.

## Fireworks

The fireworks themselves are created using `createElement` within a `setInterval` that creates 4 fireworks per second (every 250 miliseconds).   A helper function called `firework` returns a div element that is appended into the DOM via `appendChild`.

The firework element is given a random `background-color` and `x`, `y` offset position:

```JavaScript
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
```

One line of interest above concerns the assignment of color.  We're using the `rgb` attribute style to assign color, meaning that red, green, and blue each will have a value between 0 and 255.  An anonymous function that generates a random number between 0-255 is passed through to a second anonymous function as an argument named `f` that calls `f` three separate times, as necessary.

### Firework animation

The animation for the firework is handled via CSS keyframes.  A keyframe animation named `explode` will transform any element it acts upon from 0 by 0 with 80% opacity to 2000px by 2000px with no opacity (fully transparent).  We also use CSS3 `transform` to shift the element up and to the left at half the rate at which it grows so that it stays centered.

```CSS
 @keyframes explode {
    from{
      width: 0;
      height: 0;
      opacity: 0.8;
    }
    to{
      width: 2000px;
      height: 2000px;
      transform: translateX(-1000px) translateY(-1000px);
      opacity: 0;
    }
  }
```

The firework itself is shaped as a circle by applying a `border-radius` of 50%.

### Firework teardown

We want to remove the firework element after it has transitioned to being completely transparent so we use `setTimeout` to remove the node after a 3 second delay:

```JavaScript
setTimeout( () => {
  el.parentNode.removeChild(el);
}, 3000 );
```

### Shutting the music off

After we're out of fireworks, we want to turn the volume down for our player and shut the stream down.  We'll do this in a few stages.  First, we'll clear out the intervalId that we'd stored.  Then we'll start up another interval to gradually turn the volume down 10% from where it currently is.  Once the volume reaches 0, we clear out the volume interval and stop our player:

```JavaScript
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
```

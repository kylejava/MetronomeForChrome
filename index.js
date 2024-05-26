let metronome = new Metronome
const add = document.getElementById("add")
const sub = document.getElementById("sub")
const play = document.getElementById("play")
let bpm = document.getElementById("bpm")
start = false
value = 80
bpm.value = value

add.addEventListener('click', function(){
  if(value < 240){
    value++


    bpm.value = value
    metronome.tempo = value
  }
});

function startMetronome(){
  console.log("Hello!")
}

function stopMetronome(){
  console.log("Hello!!!!")
}


sub.addEventListener('click', function(){
  if(value > 40){
    value--
    bpm.value = value
    metronome.tempo = value
  }
});

bpm.addEventListener('input', async () =>{
  await new Promise(resolve => setTimeout(resolve, 1000)); // 3 sec
  if(bpm.value < 40){
    bpm.value=40
    value = bpm.value
    metronome.tempo = value
  }
  else if (bpm.value>240) {
    bpm.value=240
    value = bpm.value
    metronome.tempo=value
  }
  else{
    value = bpm.value
    metronome.tempo = value
  }
})

play.addEventListener("click",function(){
  metronome.playSound()
  start = !start
  if(start){
    document.getElementById("iconStat").className = "fa-solid fa-pause"
  }
  else{
    document.getElementById("iconStat").className = "fa-solid fa-play"
  }

});

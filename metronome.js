class Metronome{
  constructor(tempo = 80){
    this.start = false;
    this.tempo = tempo;
    this.player = null;
    this.audio = null;
    this.nextNote = 0.0;
    this.current = 0;
    this.notesQueue = [];
  }
  next(){
    var seconds = 60.0/ this.tempo;


    this.nextNote += seconds

  }

  scheduleNote(beat, time){
    this.notesQueue.push({note: beat, time:time})
    const osc = this.audio.createOscillator();
    const env =this.audio.createGain();
    osc.frequency.value = 800
    env.gain.value = 1
    env.gain.exponentialRampToValueAtTime(1, time + 0.001)
    env.gain.exponentialRampToValueAtTime(0.001, time + 0.02)
    osc.connect(env)
    env.connect(this.audio.destination)
    osc.start(time);
    osc.stop(time+0.03)
  }

  scheduler(){
    while(this.nextNote < this.audio.currentTime + 0.1){
      this.scheduleNote(this.current, this.nextNote)
      this.next();
    }
  }

  play(){
    this.start = true;
    if(this.audio == null){
      this.audio = new(window.AudioContext || window.webkitAudioContext)();
    }

    this.nextNote = this.audio.currentTime + 0.05
    this.player = setInterval(() => this.scheduler(), 25)
  }


  pause(){
    this.start = false;
    clearInterval(this.player)
  }

  playSound(){
    if(this.start){


      this.pause()
    }
    else{
      this.play()
    }
  }
}

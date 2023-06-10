class Clock{
    constructor(timeDiv, alarmDiv, alarmTime){
        this.timeDiv=timeDiv;
        this.alarmDiv=alarmDiv;
        this.alarmTime= alarmTime;
        this.alarmAudio= document.querySelector(this.alarmDiv+' #alarm_audio')// selecting alarm audio inside the ID alarm 

        let tim = document.querySelector(this.timeDiv);
        let t= new Date();
        let time=t.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'})
        tim.innerHTML= time;
        
        this.setAlarm();

        setInterval(this.updateTime.bind(this),1000)
    }
    updateTime(){
        let tim = document.querySelector(this.timeDiv);
        let t= new Date();
        let time=t.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'})
        tim.innerHTML= time;

        if(time==this.alarmTime){
            this.playAlarm();
        }

    }
    setAlarm(){
        const alarm = document.querySelector( this.alarmDiv + ' span') // selecting span inside the ID alarm
        alarm.innerText= `Alarm(${this.alarmTime})`;
    }
    playAlarm(){
        this.alarmAudio.currentTime = 0;
        this.alarmAudio.muted= false;
        this.alarmAudio.volume=1;
        this.alarmAudio.play();

    }
}

new Clock('#time','#alarm','07:52:30 PM')
class Clock{
    constructor(timeDiv, alarmDiv, alarmTime){
        this.timeDiv=timeDiv;
        this.alarmDiv=alarmDiv;
        this.alarmTime= alarmTime;
        this.alarmAudio= document.querySelector(this.alarmDiv+' #alarm_audio')// selecting alarm audio inside the ID alarm 
        this.addAlarm=document.querySelector(this.alarmDiv+ ' .addAlarm').addEventListener("click",()=>{
            let alarmObj={};
            alarmObj.hour=hour;
            alarmObj.minute=minute;
            alarmObj.index=alarmArray.length;
            alarmArray.push(alarmObj);
            createAlarm(alarmObj);            
        })
        const createAlarm=(alarmObj)=>{
            allAlarm = document.querySelectorAll('.allAlarms');

        }

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

SelectDD = document.querySelectorAll('select');

for(let i=12;i>0;i--){
    i = i<10 ? `0${i}`:i;
    let option = `<option value="${i}" >${i}</option>`;
    SelectDD[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=59;i>=0;i--){
    i = i<10 ? `0${i}`:i;
    let option = `<option value="${i}" >${i}</option>`;
    SelectDD[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=2;i>0;i--){
    const amp = i==2 ? "PM":"AM";
    let option = `<option value="${amp}" >${amp}</option>`;
    SelectDD[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

new Clock('#time','#alarm','07:52:30 PM')


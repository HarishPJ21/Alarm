SelectDD = document.querySelectorAll('select');
class Clock{
    constructor(timeDiv, alarmDiv, alarmTime){
        this.timeDiv=timeDiv;
        this.alarmDiv=alarmDiv;
        this.alarmTime= alarmTime;        
        this.alarmArray=[]
        this.alarmAudio= document.querySelector(this.alarmDiv+' #alarm_audio')// selecting alarm audio inside the ID alarm 
        this.allAlarm = document.querySelector('.allAlarms');
        this.addAlarm=document.querySelector('.setAlarm').addEventListener("click",()=>{
            let alarmObj={};
            alarmObj.time=`${SelectDD[0].value}:${SelectDD[1].value} ${SelectDD[2].value}`;
            alarmObj.index=this.alarmArray.length-1;
            this.alarmArray.push(alarmObj);
            createAlarm(this.alarmArray);            
        })
        this.deleteAlarm=document.querySelector('.deleteAlarm').addEventListener("click",(e)=>{
            const searchID=e.target.parentElement.getAttribute("data-id")
            console.log(searchID);
            const i = this.allAlarm.find(searchID);
            if(i){
                e.target.parentElement.remove();
                this.allAlarm.splice(i,1);
            }
        })
        const createAlarm=(alarmArray)=>{
            
            console.log(alarmArray.length)
            for(let i=0;i<alarmArray.length;i++){
                let alarmObj=alarmArray[i];
                let alarmRow=
                `<div class="alarmRow" data-id="${alarmObj.index}"> 
                <span class="arleft">${alarmObj.time}</span>
                <button class="deleteAlarm"><i class="fa fa-trash" aria-hidden="true"></i></button>             
                </div>`;
                this.allAlarm.firstElementChild.insertAdjacentHTML("afterend",alarmRow);
            }
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


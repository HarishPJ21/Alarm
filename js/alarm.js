class Clock{
    constructor(timeDiv){
        this.timeDiv=timeDiv;
        let tim = document.querySelector(this.timeDiv);
        let t= new Date();
        let time=t.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'})
        tim.innerHTML= time;

        setInterval(this.updateTime.bind(this),1000)
    }
    updateTime(){
        let tim = document.querySelector(this.timeDiv);
        let t= new Date();
        let time=t.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'})
        tim.innerHTML= time;

    }
}

new Clock('#time')
SelectDD = document.querySelectorAll('select');
class Clock{
    // the below constructor will be called on creation of the object for the class and using this we will define all the required variables
    constructor(timeDiv){
        this.timeDiv=timeDiv;
        this.alarmArray=[]; // this will store the all the alarms that are created
        this.allAlarm = document.querySelector('.allAlarms');//selecting allAlarms class as a veriable
        this.addAlarm=document.querySelector('.setAlarm').addEventListener("click",()=>{
            let alarmObj={};
            if(SelectDD[0].value=="00" || SelectDD[2].value=="00"){
            alert("kindly select a valid data")    
            return;
        }
            alarmObj.time=`${SelectDD[0].value}:${SelectDD[1].value}:${"00"} ${SelectDD[2].value}`;
            alarmObj.index=this.alarmArray.length;
            this.alarmArray.push(alarmObj);
            this.createAlarm(alarmObj);            
            console.log(alarmObj);
        })

        let tim = document.querySelector(this.timeDiv);
        let t= new Date();
        let time=t.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'})
        tim.innerHTML= time;
        
        setInterval(this.updateTime.bind(this),1000)
    }
    //this function will be called when the delete button is hit and with the help of Search function it will check and if id matched it will delete from the UI and alarmArray
        deleteAlarm(e){
            const searchID=e.target.parentElement.parentElement.getAttribute("data-id")
            
            const i = this.search(this.alarmArray,searchID);
            
            if(i!=-1){
                e.target.parentElement.parentElement.remove();
                this.alarmArray.splice(i,1);
                console.log(this.alarmArray);
            }

        }
        // this function will search if the searchid matches with any of the alarmArray id and if found it will return the index

        search(alarmArray,searchID){

            for(let j=0;j<alarmArray.length;j++){
                if(searchID == alarmArray[j].index) return j;
            }
            return -1;
            }
        
        // this function will create the alarm and add it in the allAlarm class as a child

        createAlarm(alarmObj){
            //here we are creating the alarmRos of element div and class alarmRow and we are also assinging some data-id for tracking the div
            let alarmRow = document.createElement("div");
            alarmRow.classList.add("alarmRow");
            alarmRow.setAttribute("data-id", alarmObj.index);
            alarmRow.innerHTML = `<span class="arleft">${alarmObj.time}</span>`;
            console.log(alarmRow);
            //here we are creating the alarmRos of element button and class deleteAlarm
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
            deleteButton.classList.add("deleteAlarm");
            deleteButton.addEventListener("click", (e) => this.deleteAlarm(e));
            //Under the alarmRow we are adding deleteButton
            alarmRow.appendChild(deleteButton);
            this.allAlarm.appendChild(alarmRow);
        }   

        //this function will update the time on every second as this is called in the constructor
        // and also will check if any alarm matches with the current time and will populate the aleart if matched

        updateTime(){
        let tim = document.querySelector(this.timeDiv);
        let t= new Date();
        //the belwo time variable will update the t variable's string value with hours, min and sec (2-dig values)
        let time=t.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'})
        tim.innerHTML= time;
        for(let i=0;i<this.alarmArray.length;i++){
            if(time==this.alarmArray[i].time){
                alert("alarm rings");
            }    
        }
    }
}

// using the below for loops we are adding the dropdown values inside the minutes hours dropdown
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

new Clock('#time')


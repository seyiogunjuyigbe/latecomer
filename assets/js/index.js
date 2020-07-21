    let modal_title = document.querySelector("#modal_title");
    let resp_text = document.querySelector("#resp_text");
    let loader = document.querySelector('#loader');
    let timeField = document.querySelector('#timeinp');
    let diffField = document.querySelector('#diff');    
    let lateFee = 0.02;
    // store new employee details to localstorage
    var currentData;
    if(localStorage.getItem('data') !== null) {
        
        currentData = localStorage.getItem('data')

    }else{
        localStorage.setItem('data', "[]");
        currentData = "[]";

    }
    let form = document.querySelector('#employeeForm');
    form.onsubmit = (e) =>{
        e.preventDefault();
        $('#modal').modal('show');
        loader.style.display = 'block'
        let formData = formToJSON(form.elements); 
        // get time difference in minutes
        formData.diff = getTimeDiff(timeField.value);
        // calculate lateness fee
        if(formData.diff <= 0){
            formData.fee = 0

        } else{
            (formData.fee = formData.diff * 0.02).toFixed(2)
        }
        
         // fetch all data

        let arr = JSON.parse(currentData);
        // check if eployee data exists
        var existingName = arr.find((x)=>{
            return x.name == formData.name
        });
        if(existingName){
            arr[arr.indexOf(existingName)].diff = formData.diff;
            arr[arr.indexOf(existingName)].fee = formData.fee
            arr[arr.indexOf(existingName)].address = formData.address
            arr[arr.indexOf(existingName)].email = formData.email

        } else{
            arr.push(formData);
        }
        
        // update storage
        localStorage.setItem('data', JSON.stringify(arr));
        console.log({now:localStorage.getItem('data')});
        loader.style.display = 'none'
        // success message
        modal_title.setAttribute('class','text-success');
         modal_title.textContent = 'Success!';
         resp_text.setAttribute('class','text-success');
         if(existingName){
            resp_text.textContent = 'Attendance Record for ' + existingName.name + " updated";
         } else{
             resp_text.textContent = 'Attendance Recorded';
         }
         
        //  redirect to list page
         $('#modal').on('hide.bs.modal',(e=>{
             window.location.href = window.location.origin+'/list.html'
            })
         )
    }
    const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    data[element.name] = element.value;
    return data;
    }, {});

    const getTimeDiff = (a)=>{
        // get today's date at 8:00 AM
        let shiftStart = new Date(`${new Date().toDateString()} ${localStorage.getItem('startTime')}`).getTime();
        // get today's date at clock in time
        let att = new Date(`${new Date().toDateString()} ${a}`).getTime();
        // convert to minutes
        let diff = (att - shiftStart) * 1.66667e-5
        return Math.round(diff)
    }

// set shift time
var recordBtn = document.querySelector('#record');
var shiftValue = document.querySelector('#setTime');
recordBtn.addEventListener('click', ()=>{
    if(shiftValue.value == "") alert('Please specify employee shift start time');
    else{
        localStorage.setItem('startTime', shiftValue.value);
        alert('Shift start time saved');
        $('#timeModal').modal('hide');
    }
})
window.addEventListener('click', ()=>{
    if(localStorage.getItem('startTime') == null){
        // open modal again
        $('#timeModal').modal('show',{
            keyboard: false
          });
    }
});
 
// reset
document.querySelector('#reset').addEventListener('click', ()=>{
    localStorage.clear();
    alert('App Reset Successful');
    window.location.reload()
});

// check if shit time is set
if(localStorage.getItem('startTime') == null){
        // open modal again
        $('#timeModal').modal('show');
    }


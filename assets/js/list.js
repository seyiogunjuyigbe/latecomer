var prevBtn = document.querySelector('#prev');
var nextBtn = document.querySelector('#next');
var pageno = document.querySelector('#pageno');
let prevData = Number(prevBtn.getAttribute('data'))
let nextData = Number(nextBtn.getAttribute('data'));  
// sort function
const compare_qty = (a, b) =>{
        // a should come before b in the sorted order
        if(a.fee < b.fee){
                return 1;
        // a should come after b in the sorted order
        }else if(a.fee > b.fee){
                return -1;
        // a and b are the same
        }else{
                return 0;
        }
    }
    var data;
    if(localStorage.getItem('data') == null) data = [];
    else data = JSON.parse(localStorage.getItem('data')); 
  const sortAndCount = (x)=>{

    data = data.sort(compare_qty);
    return data.slice(x*10,(x*10)+10)
    }


const appendTr = (arr,tr) =>{
        if(arr == undefined || arr.length == 0){
                return false
        } else{
              arr.forEach(x=>{
tr+=`
        <tr>
            <th scope="row">${arr.indexOf(x)+1}</th>
            <td>${x.name}</td>
            <td>${x.email}</td>
            <td>${x.address}</td>
            <td>${x.diff}</td>
            <td>${x.fee}</td>
          </tr>`
});
return tr;   
        }
       
}
window.onload = () =>{
        try{
               var arr = sortAndCount(0); 
        } catch(err){
                alert(err.message)
        }

var tr = ""
tr = appendTr(arr,tr);
if(!tr || tr.length==0) tr = "No data found"

document.querySelector('tbody').innerHTML = tr
// prevBtn.setAttribute('disabled',true)

}
// paginate forward
const paginate = ()=>{
  let prevData = Number(prevBtn.getAttribute('data'))
let nextData = Number(nextBtn.getAttribute('data'));  
try{
        var arr = sortAndCount(nextData); 
 } catch(err){
         console.log(err.message)
 }

var tr = ""
tr = appendTr(arr,tr);
if(!tr || tr.length==0){ tr = "No data found"
nextBtn.setAttribute('disabled',true)
}
if(tr.length<10){
nextBtn.setAttribute('disabled',true);
prevBtn.setAttribute('disabled',false)

}
else{
    document.querySelector('tbody').innerHTML = tr;  
    pageno.textcontent = "Page "
    nextBtn.setAttribute('data',nextData+1)  
    prevBtn.setAttribute('data',prevData+1)  

}

}

// paginate backwards
const depaginate = ()=>{

      try{
              var arr = sortAndCount(prevData); 
       } catch(err){
               console.log(err.message)
       }
      
      var tr = ""
      tr = appendTr(arr,tr);
      if(!tr || tr.length==0){ tr = "No data found"
      prevBtn.setAttribute('disabled',true)
      nextBtn.setAttribute('disabled',false)

      }
      if(prevData <0){
        prevBtn.setAttribute('disabled',true)
      nextBtn.setAttribute('disabled',false)

        }
      else{
          document.querySelector('tbody').innerHTML = tr;  
          pageno.textcontent = "Page "
          nextBtn.setAttribute('data',String(nextData-1))  
          prevBtn.setAttribute('data',String(prevData-1))  
          nextBtn.setAttribute('disabled',false)
      
      }
      
      }

// reset
const reset = ()=>{
        localStorage.clear();
        alert('App Reset Successful');
        window.location.reload()
    }

//     search
    const search = async (text)=>{
            if(text == undefined || text == ""){
                alert('Please enter employee search name')
                return false;
            }
            try {
                var found = await data.filter((x)=>{
                  return x.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
                        });  
            } catch (error) {
                  return false  
            }
         
    var result;
    if(found) {console.log({found});result = appendTr(found,tr="");}
    else result = "No employee found"
    if(!result || result.length==0) result = "No employee found"
    
    document.querySelector('tbody').innerHTML = result
    }
var searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener('click',()=>{
        search(document.querySelector('#searchText').value)
});

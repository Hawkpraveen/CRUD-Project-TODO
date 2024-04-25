const form=document.getElementById("form");
const textInput=document.getElementById("textInput");
const date=document.getElementById("dateInput");
const textarea=document.getElementById("textarea");
const msg=document.getElementById("msg");
const tasks=document.getElementById("tasks");
const add=document.getElementById("add");

//form validation function
const formValidation=()=>{
    if(textInput.value===""){
        msg.innerHTML="Input Field Can't be empty";
        //console.log("data not found");
    }
    else{
        msg.innerHTML="";
        //console.log(("data found"));
        getData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();
        (()=>{
            add.setAttribute("data-bs-dismiss","")
        })();
    }
}

//submit button logic
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    formValidation();
})

//getting details from the form and storing in data
let data=[{}];
const getData=()=>{
    data.push({
        text:textInput.value,
        date:dateInput.value,
        task:textarea.value
    });
    localStorage.setItem("data",JSON.stringify(data));
   // console.log("get",data);
    createTask();
};

//create function
const createTask=()=>{
    tasks.innerHTML="";
    data.map((ele,i)=>{
        return (tasks.innerHTML += `<div id=${i}>
        <span class="fw-bolder" >${ele.text}</span><br>
        <span class="small" >${ele.date}</span>
        <p>${ele.task}</p>
        <span class="options">
        <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-user-pen fa-l" ></i>
        <i onclick="deleteTask(this);createTask()" class="fa-solid fa-trash fa-l" ></i>
        </span>
        </div>
        `)
    })
    resetForm();
}

//resetting form logic
const resetForm=()=>{
    textInput.value="";
    dateInput.value= "";
    textarea.value ="";
}
(()=>{
    data=JSON.parse(localStorage.getItem("data")) || [];
    //console.log("rest",data);
    createTask();
})();

//edit function for todo
const editTask=(e)=>{
    let task=e.parentElement.parentElement;
    textInput.value=task.children[0].innerHTML;
    date.value=task.children[1].innerHTML;
    textarea.value=task.children[2].innerHTML;

    //task remove
    deleteTask(e);
}


//delete function for todo
const deleteTask=(e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem("data",JSON.stringify(data))
}
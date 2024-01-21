let form = document.getElementById("form");
let des = document.getElementById("textInput");
let title = document.getElementById("title");
let tmsg = document.getElementById("titleMsg");
let desmsg = document.getElementById("des");
let date = document.getElementById("dateInput");
let taskSection = document.getElementById("tasks");

let add = document.getElementById("add");

form.addEventListener("submit" , (e)=>{
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if(des.value==="") {
        desmsg.innerHTML = "Add Description!!";

    }
    else if(title.value==="") {
        tmsg.innerHTML = "Title cannot be empty!!";
    }
    else {
        tmsg.innerHTML = "";
        desmsg.innerHTML = "";
        addData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();
        ( () =>{
            add.setAttribute("data-bs-dismiss","");
        })() 

    }
}

let data = [];

let addData = ()=>{

    data.push({
        description: des.value,
        title : title.value,
        date:  date.value,
    });

    /** 
     * ! Storing data into the Local Storage.  
    */
    localStorage.setItem("data", JSON.stringify(data)); 

    console.log(data);


    showData();
}


let showData = () => {
    taskSection.innerHTML = "";

    data.map((x,y)=>{

        return (taskSection.innerHTML += 
            `
            <div id="${y}">
                        <span class="fw-bold">${x.title}</span>
                        <span class="small text-secondary">${x.date}</span>
                        <p>${x.description}</p>
            
                        <span class="options">
                            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="bi bi-pencil-square"></i>
                            <i onClick="deleteTask(this); showData()" class="bi bi-trash-fill"></i>
                        </span>
            
                    </div>
            `);

    });

    

    resetForm();

   

}

let resetForm = () => {
    des.value = "";
    title.value = "";
    date.value = "";
}

let editTask = (e) => {

    let selected = e.parentElement.parentElement;

    title.value = selected.children[0].innerHTML;
    date.value =  selected.children[1].innerHTML;
    des.value = selected.children[2].innerHTML;

    deleteTask(e); 
    
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();

    /** 
     * ! Deleting data   
    */
    data.splice(e.parentElement.parentElement.id,1); //! form the screen
    localStorage.setItem("data", JSON.stringify(data)); //? from local storage

}

(()=>{
    data = JSON.parse(localStorage.getItem("data"))|| [];
    showData();
})();


document.getElementById('log-in-out').addEventListener('click', () => {
  fetch('/logout', {
    method: 'POST'
  })
    .then(response => {
      window.location.href="/";  
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('team');

    })
    .catch(error => {
      alert("Error in logging out");
    });
});
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  });
  return await response.json(); 
}
//fill in logged in user details on the webpage
const username = localStorage.getItem('username');
const role = localStorage.getItem('role');
const team = localStorage.getItem('team');
document.getElementById('member-name').textContent =  document.getElementById('user-name').textContent= username;
document.getElementById('position').innerHTML =`<span>{ </span>${role + ", "+team} Team<span> }</span>`;

document.addEventListener("DOMContentLoaded", () => {

// to store assigned tasks and assigned tasks
let assigned_tasks = [];
let upcoming_tasks = [];

// ========================================================================================
// functions to be performed after clicking 'Assigned Tasks'
const assignedTaskButton = document.getElementById("assigned-task");
assignedTaskButton.addEventListener("click", function(){
    const taskList = document.getElementById("tasks-list");
    this.style.color = "yellow";
    upcomingTaskButton.style.color = "white";
    taskList.innerHTML  = "";
    assigned_tasks.forEach((row, index) => {
      taskList.innerHTML += `<div class="task" data-bs-toggle="modal" data-bs-target="#exampleModal3" data-index="${index}">
      <div class="row">
        <h5 class="title col">${row.title}</h5>
        <div class="col" style="text-align: end">
          <button class="btn-completed" data-id="${row.title}" data-group="${row.id}" data-bs-toggle="modal" data-bs-dismiss="modal" aria-label="Close">Mark as Complete</button>
        </div>
      </div>
      <p class="desc">${row.description}</p>
    </div>`;
    //data-id in button contains the title of the task for whom completed is clicked.
    console.log("row title: ", document.querySelector(".task .row .title"));
    });
    attachEventListeners();
})

// functions to be performed after clicking 'Assigned Tasks'
const upcomingTaskButton = document.getElementById("upcoming-task");
upcomingTaskButton.addEventListener("click", function(){
    const taskList = document.getElementById("tasks-list");
    this.style.color = "yellow";
    assignedTaskButton.style.color = "white";
    taskList.innerHTML  = "";
    upcoming_tasks.forEach((row, index) => {
      taskList.innerHTML += `<div class="task" data-group="${row.id}" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-index="${index}">
        <h5 class="title" data-group="${row.id}">${row.title}</h5>
      <p class="desc">${row.description}</p>
    </div>`;
    });
})


// Managing visibility of 'view members' button according to role
const viewMembersButton = document.getElementById("view-members");
if(role == "Associate"){
  viewMembersButton.style.display = "block";
}
else if(role == "Coordinator"){
  viewMembersButton.style.display = "none";
  document.getElementById("notices").style.minHeight = '100%';
}

//Modal for upcoming tasks
document.getElementById("exampleModal1").addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget; // Button that triggered the modal
            const index = button.getAttribute('data-index'); // Extract info from data-* attributes
            const item = upcoming_tasks[index]; // Use the index to get the right data
              taskClickedId=event.relatedTarget.getAttribute('data-group');
              console.log("taskid",taskClickedId);
            // Update the modal's content
            const modalTitle = document.getElementById('exampleModalLabel1');
            const modalBody = document.getElementById('modalBody1');
            modalTitle.textContent = item.title;
            modalBody.textContent = item.description;
});

//modal for assigned tasks
document.getElementById("exampleModal3").addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget; // Button that triggered the modal
  console.log('event target: ', button);
            const index = button.getAttribute('data-index'); // Extract info from data-* attributes
            const item = assigned_tasks[index]; // Use the index to get the right data

            // Update the modal's content
            const modalTitle = document.getElementById('exampleModalLabel3');
            const modalBody = document.getElementById('modalBody2');
            modalTitle.textContent = item.title;
            modalBody.textContent = item.description;
            console.log('modal title: ',modalTitle);
});

// Permissions according to role
if(role==="Core") {
  document.getElementById('accept-btn').style.display="none";
}
if(role==="Coordinator") {
  document.getElementById('assign-btn').style.display="none";
}


let taskClickedId;
// function for filling the second modal ❗
const fillPeopleList = async (event) => {
  let response=await postData("/getCoordinates",{team:localStorage.getItem('team')});
  if(response.status){
    const people2 = response.data.map(obj=>obj.username);
    // Populate people list in the modal
  const peopleList2 = document.getElementById('peopleList2');
  peopleList2.innerHTML='';
  people2.forEach(person => {
      const radioDiv = document.createElement('div');
      radioDiv.classList.add('form-check');
      const radioInput = document.createElement('input');
      radioInput.classList.add('form-check-input');
      radioInput.type = 'radio';
      radioInput.name = 'people';
      radioInput.value = person;
      const radioLabel = document.createElement('label');
      radioLabel.classList.add('form-check-label');
      radioLabel.textContent = person;
      radioDiv.appendChild(radioInput);
      radioDiv.appendChild(radioLabel);
      peopleList2.appendChild(radioDiv);
  });
  }
  else{
    alert("Error in fetching coordinates");
  }
}
 async function updateTaskStatus(selectedPerson){
  let response=await postData("/assignTask",{assignedTo:selectedPerson,taskId:taskClickedId});
    if(response.status){
      alert("Task assigned successfully");
      window.location.reload();

    }else{
      alert("Error in assigning task");
    }
 }
  // Function to submit form (you can customize this according to your needs) ❗
  const submitForm = async () => {
    const form = document.getElementById('peopleForm');
    const formData = new FormData(form);
    const selectedPerson = formData.get('people');  //selectedPerson contains the name of the person who is assigned the task
    console.log('Selected Person:', selectedPerson);

    //set the status of the task to assigned
    updateTaskStatus(selectedPerson);
}
document.getElementById('submit-people').addEventListener('click', submitForm);


//Open the second modal on clicking the assign btn ✅
document.getElementById('assign-btn').addEventListener('click', fillPeopleList);
document.getElementById('accept-btn').addEventListener('click', () => {
  updateTaskStatus(localStorage.getItem('username'));
});

//function to handle completed button
function attachEventListeners() {
  const buttons = document.querySelectorAll('.btn-completed');
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      const taskId = this.getAttribute('data-group');
      console.log('Marking task as complete:', taskId);
      // Your logic to handle the button click
      // Send an update request with the taskId
      fetch(`/updateTaskStatus/${taskId}`, {
        method: 'PUT',
      })
      .then(response => {
        // Remove the task element from the DOM
        if(response.ok){
          alert("Task marked as completed");
          window.location.reload();
        }
        else{
          alert("Task not marked as completed");
        }
      })
      .catch(error => {
        console.log("Error in marking task as complete",error);
      });
    });
  });
}

//get all tasks of a team
async function getTasks(){
  let response=await postData('/getTasks', {team:localStorage.getItem('team')});
  if(response.status){
      let allTasks=response.data.map(obj => ({"title":obj.title,"description":obj.description,"status":obj.status,"assignedTo":obj.assignedTo,"id":obj._id}));
      upcoming_tasks = allTasks.filter(task => task.status === "Uploaded");
      assigned_tasks = allTasks.filter(task => task.status === "Assigned" && task.assignedTo === localStorage.getItem('username'));
      const taskList = document.getElementById("tasks-list");
          upcoming_tasks.forEach((row, index) => {
            taskList.innerHTML += `<div class="task" data-group="${row.id}" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-index="${index}">
              <h5 class="title" data-group="${row.id}">${row.title}</h5>
              <p class="desc" data-group="${row.id}">${row.description}</p>
          </div>`;
          });
  }
  else{
      alert("Error in fetching tasks");
  }

}

getTasks();

async function getNotices(){
  let response=await postData("/getNotices"); 
  console.log("responsefrom server: ",response)
  if(response.status){
  // adding notices to notice list in 'Notice Board'
  response.data.map((row) => {
    document.getElementById("notice-list").innerHTML += `<li>
      <div class="row">
                  <h5 class="notice-title col">${row.title}</h5>
                  <div class="col delete-notice" data-noticeId=${row._id} style="text-align: end">
                  </div>
                </div>
      ${row.description}
    </li>`;
  });
  deleteNoticeButtons= document.querySelectorAll(".delete-notice");

  deleteNoticeButtons.forEach((button) => {
    button.addEventListener("click", deleteNotice);
  });
  }
else{
  alert("Error in getting notices");
}

}
getNotices();

});
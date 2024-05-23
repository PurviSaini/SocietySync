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
document.getElementById('position').textContent =role + ", "+team+ " Team";;
document.addEventListener("DOMContentLoaded", () => {

// ======================================================================
// Dummy data for assigned tasks
let assigned_tasks = [];
let upcoming_tasks = [];

// ========================================================================================
// functions to be performed after clicking 'Assigned Tasks'
const assignedTaskButton = document.getElementById("assigned-task");
assignedTaskButton.addEventListener("click", function(){
    const taskList = document.getElementById("tasks-list");
    taskList.innerHTML  = "";
    assigned_tasks.forEach((row) => {
      taskList.innerHTML += `<div class="task"">
        <h5 class="title">${row.title}</h5>
      ${row.description}
    </div>`;
    });
})

// functions to be performed after clicking 'Assigned Tasks'
const upcomingTaskButton = document.getElementById("upcoming-task");
upcomingTaskButton.addEventListener("click", function(){
    const taskList = document.getElementById("tasks-list");
    taskList.innerHTML  = "";
    upcoming_tasks.forEach((row) => {
      taskList.innerHTML += `<div class="task" data-bs-toggle="modal" data-bs-target="#exampleModal1">
        <h5 class="title">${row.title}</h5>
      ${row.description}
    </div>`;
    });
})

// =================================================================================================
// Dummy data for notices
const notices = [
    {
        sno: 1,
        title: "Title 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendinumquam ea ducimus nemo voluptates totam",
      },
      {
        sno: 2,
        title: "Title 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendinumquam ea ducimus nemo voluptates totam",
      },
      {
        sno: 3,
        title: "Title 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendinumquam ea ducimus nemo voluptates totam",
      },
      {
        sno: 4,
        title: "Title 4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendinumquam ea ducimus nemo voluptates totam",
      }
    ]
// adding notices to notice list in 'Notice Board'
notices.forEach(row => {
    document.getElementById("notice-list").innerHTML += `<li>
    <h5 class="notice-title">${row.title}</h5>
    ${row.description}
  </li>
  <hr />`
})

// ==============================================================================

// Managind visibility of 'view members' button according to role
const viewMembersButton = document.getElementById("view-members");
if(role == "Associate"){
  viewMembersButton.style.display = "block";
}
else if(role == "Coordinator"){
  viewMembersButton.style.display = "none";
  document.getElementById("notices").style.minHeight = '100%';
}

//=================================================================================

////////////////////////////////////////////////////////////////////////////////////////////////////////
//SEEMRAN
function openTaskBox(taskBoxes){
taskBoxes.forEach(taskBox => {
  taskBox.addEventListener('click', () => {
  console.log("Clicked taskBox");

    // Get modal title element
    const heading = taskBox.querySelector('.title').innerText;
    const content = taskBox.querySelector('.desc').innerText;
    const modalTitle = document.querySelector('.modal-title');
    // Set modal title
    modalTitle.textContent = heading;
    // Get modal body content element
    const modalBodyContent = document.querySelector('.modal-body');
    // Set modal body content
    modalBodyContent.textContent = content;
  });
});
}


if(role==="Core") {
  document.getElementById('accept-btn').style.display="none";
}
if(role==="Coordinator") {
  document.getElementById('assign-btn').style.display="none";
}

//function for filling the second modal ❗
const fillPeopleList = () => {
  const people2 = ['Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5'];
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

  // Function to submit form (you can customize this according to your needs) ❗
  const submitForm = () => {
      const form = document.getElementById('peopleForm');
      const formData = new FormData(form);
      const selectedPerson = formData.get('people');  //selectedPerson contains the name of the person who is assigned the task
      console.log('Selected Person:', selectedPerson);
  }
  document.getElementById('submit-people').addEventListener('click', submitForm);
}

//Open the second modal on clicking the assign btn ✅
document.getElementById('assign-btn').addEventListener('click', fillPeopleList);

//get all tasks of a team
async function getTasks(){
  let response=await postData('/getTasks', {team:localStorage.getItem('team')});
  if(response.status){
      let allTasks=response.data.map(obj => ({"title":obj.title,"description":obj.description,"status":obj.status,"assignedTo":obj.assignedTo}));
      upcoming_tasks = allTasks.filter(task => task.status === "Uploaded");
      assigned_tasks = allTasks.filter(task => task.status === "Assigned" && task.assignedTo === localStorage.getItem('username'));
      const taskList = document.getElementById("tasks-list");
          upcoming_tasks.forEach((row) => {
            taskList.innerHTML += `<div class="task" data-bs-toggle="modal" data-bs-target="#exampleModal1">
              <h5 class="title">${row.title}</h5>
              <p class="desc">${row.description}</p>
          </div>`;
          });
          let taskBoxes = document.querySelectorAll(".task");
          openTaskBox(taskBoxes);
  }
  else{
      alert("Error in fetching tasks");
  }

}

getTasks();

});
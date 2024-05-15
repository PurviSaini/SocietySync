document.getElementById('log-in-out').addEventListener('click', () => {
  fetch('/logout', {
    method: 'POST'
  })
    .then(response => {
      window.location.href="/";  
    })
    .catch(error => {
      alert("Error in logging out");
    });
});
document.addEventListener("DOMContentLoaded", () => {

// clicking log out button
const logout = document.getElementById("log-in-out");
logout.addEventListener("click", function () {
  alert("Logged out!");
});

// ======================================================================
// Dummy data for assigned tasks
const assigned_tasks = [
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
  }
];

// adding assigned tasks to task list under 'Assigned Tasks' 
const taskList = document.getElementById("tasks-list");
assigned_tasks.forEach((row) => {
  taskList.innerHTML += `<div class="task" data-bs-toggle="modal" data-bs-target="#exampleModal1">
    <h5 class="title">${row.title}</h5>
    <p class="desc">${row.description}</p>
</div>`;
});

// ========================================================================================
// functions to be performed after clicking 'Assigned Tasks'
const assignedTaskButton = document.getElementById("assigned-task");
assignedTaskButton.addEventListener("click", function(){
    alert("you now can see assigned tasks!");
})

// functions to be performed after clicking 'Assigned Tasks'
const upcomingTaskButton = document.getElementById("upcoming-task");
upcomingTaskButton.addEventListener("click", function(){
    alert("you now can see upcoming tasks!");
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

let role = "Associate";
// role = "Coordinator";

// writing position of member in page
const position = document.getElementById("position");
position.innerText = role;


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


const taskBoxes = document.querySelectorAll(".task");
taskBoxes.forEach(taskBox => {
  console.log("Entered taskBox");
  taskBox.addEventListener('click', () => {
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

});
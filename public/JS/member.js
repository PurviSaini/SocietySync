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
  taskList.innerHTML += `<div class="task"">
    <h5 class="title">${row.title}</h5>
  ${row.description}
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
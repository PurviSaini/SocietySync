document.getElementById("log-in-out").addEventListener("click", () => {
  fetch("/logout", {
    method: "POST",
  })
    .then((response) => {
      window.location.href = "/";
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("team");
    })
    .catch((error) => {
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
const username = localStorage.getItem("username");
const role = localStorage.getItem("role");
let team = localStorage.getItem("team");
document.getElementById("member-name").textContent = document.getElementById(
  "user-name"
).textContent = username;
document.getElementById("position").textContent = role;

//open specific team page on clicking team container
const openTeam = (event) => {
  localStorage.setItem("team", event.target.querySelector("p").textContent);
  window.location.href = "/Team";
};

const teamDiv = document.querySelector(".teams");
const colDiv = teamDiv.querySelectorAll(".col");

colDiv.forEach((col) => {
  col.addEventListener("click", openTeam);
});

//function to upload the task in a variable ❗
const uploadTask = async () => {
  // Get form data
  const taskTitle = document.getElementById("taskTitle").value;
  const taskDescription = document.getElementById("taskDescription").value;
  let team = document.getElementById("team").value;
  if (team === "All") {
    team = ["Website","Public Relations","Event Management","Sponsor","Creative"]; 
  }
  // Create task object
  const task = {
    title: taskTitle,
    description: taskDescription,
    team: team,
  };
  let response = await postData("/uploadTask", task);
  if (response.status) {
    alert("Task uploaded successfully");
  } else {
    alert("Error in uploading task");
  }

  // Optionally, you can clear the form fields after submission
  document.getElementById("taskForm").reset();
};

document.getElementById("upload-task").addEventListener("click", uploadTask);

// =======================================================================
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
  },
];
// adding notices to notice list in 'Notice Board'
notices.forEach((row) => {
  document.getElementById("notice-list").innerHTML += `<li>
    <div class="row">
                <h5 class="notice-title col">${row.title}</h5>
                <div class="col delete-notice" style="text-align: end">
                  <i class="fa fa-minus-circle"></i>
                </div>
              </div>
    ${row.description}
  </li>
  <hr />`;
});

// ======================================================================================
// Adding
const addNotice = document.getElementById("addNotice");
addNotice.addEventListener("click", function () {
  const noticeTitle = document.getElementById("notice-title").value;
  const noticeDescription = document.getElementById("notice-desc").value;

  // dummy data
  const noticeList = [
    { sno: 1, title: noticeTitle, description: noticeDescription },
  ];

  noticeList.forEach((row) => {
    document.getElementById("notice-list").innerHTML += `<li>
    <h5 class="notice-title">${row.title}</h5>
    ${row.noticeDescription}
  </li>
  <hr/>`;
  });
});

// Or use function to add notice
function appendNotice(notices) {
  notices.forEach((row) => {
    document.getElementById("notice-list").innerHTML += `<li>
        <h5 class="notice-title">${row.title}</h5>
        ${row.description}
      </li>
      <hr />`;
  });
}

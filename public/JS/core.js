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
document.getElementById("position").innerHTML = `<span>{ </span>${role}<span> }</span>`;

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


let deleteNoticeButtons;
// Function to add notice
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
                    <i class="fa fa-minus-circle"></i>
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
// upload notice
const addNotice = document.getElementById("addNotice");
addNotice.addEventListener("click", async function () {
  const noticeTitle = document.getElementById("notice-title").value;
  const noticeDescription = document.getElementById("notice-desc").value;
  console.log(noticeTitle, noticeDescription);

  //add notice to db
  let response=await postData("/uploadNotice",{title:noticeTitle,description:noticeDescription});
  if(response.status){
    alert("Notice uploaded successfully");
    document.getElementById("notice-list").innerHTML += `<li>
    <div class="row">
                <h5 class="notice-title col">${noticeTitle}</h5>
                <div class="col delete-notice" data-noticeId=${response.id} style="text-align: end">
                  <i class="fa fa-minus-circle"></i>
                </div>
              </div>
    ${noticeDescription}
    </li>`;
deleteNoticeButtons= document.querySelectorAll(".delete-notice");

deleteNoticeButtons.forEach((button) => {
  button.addEventListener("click", deleteNotice);
});
  }
  else{
    alert("Error in uploading notice");
  }

  document.getElementById("notice-form").reset();
});

// Function to delete notice
const deleteNotice = (event) => {
  const noticeId = event.target.parentElement.getAttribute("data-noticeId");
  console.log(event.target.parentElement.parentElement.parentElement);

  // Make a request to delete notice with the given noticeId
  fetch(`/deleteNotice/${noticeId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status) {
        // Remove the notice from the DOM
        event.target.parentElement.parentElement.parentElement.remove();

        alert("Notice deleted successfully");
      } else {
        alert("Error in deleting notice");
      }
    })
    .catch((error) => {
      alert("Error in deleting notice");
    });
};

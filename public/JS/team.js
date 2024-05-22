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
  
  //display team name and username
document.querySelector("#user-name").textContent=localStorage.getItem('username');
document.querySelector(".team-name").textContent=localStorage.getItem('team')+" Team";
document.addEventListener('DOMContentLoaded', async function () {
    //Hide the associates list if Role is of an Associate
    //Done ✅
    let role = localStorage.getItem('role');
    const associateList = document.querySelector('.sidebar');
    if(role === "Associate") {
        associateList.style.display = 'none';
    }else{

    let response=await postData('/getAssociates', {team:localStorage.getItem('team'),role:"Associate"});
    if(response.status){
    // Backend data will be used instead of this for list of all the associates in a particular team
    const people = response.data.map(obj => obj.username);
    // Populate people list ❗
    const peopleList = document.getElementById('peopleList');
    people.forEach(person => {
        const listItem = document.createElement('li');
        listItem.textContent = person;
        listItem.classList.add('list-group-item');
        peopleList.appendChild(listItem);
    });
    }
    else{
        alert("Error in fetching associates");
    }
    }

    // Dummy data for table ❗
    // Backend data will be used instead of this for list of coordinators/associates from a team who are assigned to or have completed a task.
    const tableData = [
        { sno: 1, name: 'John Doe', taskTitle:'Design the Holi Poster', status:'Assigned' },
        { sno: 2, name: 'Jane Smith', taskTitle:'Create the writeup for diwali post', status:'Completed' },
        { sno: 3, name: 'Bob Johnson', taskTitle:'Make a painting', status:'Uploaded' }
    ];

    // Populate table ❗
    const tableBody = document.getElementById('tableBody');
    tableData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.sno}</td>
            <td>${row.name}</td>
            <td>${row.taskTitle}</td>
            <td>${row.status}</td>
        `;
        tableBody.appendChild(tr);
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //assign color to status according to its value
    //This is done ✅
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const statusCell = row.querySelector("td:nth-child(4)");
        console.log(statusCell);
        switch(statusCell.textContent) {
            case 'Uploaded': statusCell.style.color="goldenrod";
                             break;
            case 'Assigned': statusCell.style.color="brown";
                             break;
            case 'Completed': statusCell.style.color="#579fab";
                              break;
        }
    })

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

    const taskBoxes = document.querySelectorAll(".task");
    console.log(taskBoxes);
    taskBoxes.forEach(taskBox => {
      console.log("Entered taskBox");
      taskBox.addEventListener('click', () => {
      // Get modal title element
      const heading = taskBox.querySelector('.title').innerText;
      
      const content = taskBox.querySelector('.desc').innerText;
      const modalTitle = document.querySelector('.modal-title');
      // Set modal title
      modalTitle.textContent = heading;
      console.log("heading: ", modalTitle.innerText);
      // Get modal body content element
      const modalBodyContent = document.querySelector('.modal-body');
      console.log("description: ", modalBodyContent.innerText);
      // Set modal body content
      modalBodyContent.textContent = content;
    });
  });

});
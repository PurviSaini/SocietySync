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

    function handleTaskDelete(taskId) {
      // Send a request to delete the task with the given taskId
      fetch(`/deleteTask/${taskId}`, {
        method: 'DELETE'
      })
        .then(response => {
          // Remove the task element from the DOM
          if(response.ok){
            const taskElement = document.getElementById(taskId);
            const deleteBtn = document.getElementById(taskId+'a');
            deleteBtn.remove();
            taskElement.remove();
          }
          else{
            alert("Error in deleting task");
          }
        })
        .catch(error => {
          alert("Error in deleting task");
        });
    }
    //get tasks of a team
    async function getTasks(){
        let response=await postData('/getTasks', {team:localStorage.getItem('team')});
        if(response.status){
            let allTasks=response.data.map(obj => ({"title":obj.title,"description":obj.description,"id":obj._id}));
                // Populate all tasks of a team 
            const taskList = document.getElementById("tasks-list");
            allTasks.forEach((row) => {
            taskList.innerHTML += `<span class="deleteTask" id=${row.id+'a'} style="cursor:pointer">⛔</span><div class="task" id=${row.id} data-bs-toggle="modal" data-bs-target="#exampleModal1">
              <h5 class="title">${row.title} </h5>
              <p class="desc">${row.description}</p>
            </div>`;
            });

            const taskBoxes = document.querySelectorAll(".task");
            // console.log(taskBoxes);
            taskBoxes.forEach(taskBox => {
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
          // Add event listener to delete task buttons
          let deleteTaskButtons = document.querySelectorAll('.deleteTask');
          deleteTaskButtons.forEach(button => {
            button.addEventListener('click', () => {
              console.log("delete button clicked")
              const taskId = button.id.slice(0, -1);
              handleTaskDelete(taskId);
            });
          });
        }
        else{
            alert("Error in fetching tasks");
        }

    }
    getTasks();
    




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



});
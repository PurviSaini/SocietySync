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
    let role = localStorage.getItem('role');
    const associateList = document.querySelector('.sidebar');
    if(role === "Associate") {
        associateList.style.display = 'none';
    }else{

    let response=await postData('/getAssociates', {team:localStorage.getItem('team'),role:"Associate"});
    if(response.status){
    const people = response.data.map(obj => obj.username);
    // Populate people list
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
            const taskElement = document.querySelectorAll(`[data-group="${taskId}"]`);
            taskElement.forEach(element => {
              element.remove();
            });
            alert('Task deleted successfully');
          }
          else{
            alert("Error in deleting the task");
          }
        })
        .catch(error => {
          console.log("Error in deleting task",error);
        });
    }

    //show table data with tasks that are either assigned or completed
    let tableData = [];
    async function showTable(){
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
          tr.setAttribute("data-group",row["data-group"]); // Add class to the row element
          tableBody.appendChild(tr);
          const statusCell = tr.querySelector("td:nth-child(4)");
          console.log(statusCell);
          switch(statusCell.textContent) {
            case 'Uploaded': statusCell.style.color="goldenrod";
                             break;
            case 'Assigned': statusCell.style.color="brown";
                             break;
            case 'Completed': statusCell.style.color="#579fab";
                              break;
        }
      });
   
       }

    if(role==="Associate") {
      document.getElementById("task-container").style.display="none";
    }
    //get tasks of a team
    async function getTasks(){
        let response=await postData('/getTasks', {team:localStorage.getItem('team')});
        if(response.status){
            let allTasks=response.data.map(obj => ({"title":obj.title,"description":obj.description,"id":obj._id,"status":obj.status,"assignedTo":obj.assignedTo}));
                // Populate all tasks of a team 
            const taskList = document.getElementById("tasks-list");
            let sno=1;
            allTasks.forEach((row) => {
            taskList.innerHTML += `<span class="deleteTask" data-group="${row.id}" style="cursor:pointer">⛔</span><div class="task" data-group="${row.id}" data-bs-toggle="modal" data-bs-target="#exampleModal1">
              <h5 class="title">${row.title} </h5>
              <p class="desc">${row.description}</p>
            </div>`;
            if (row.status !== 'Uploaded') {
              tableData.push({
                sno: sno,
                name: row.assignedTo,
                taskTitle: row.title,
                status: row.status,
                "data-group": row.id
              });
              sno++;
            }
            });
            showTable();
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
              console.log("delete button clicked",button.getAttribute("data-group"));
              const taskId =button.getAttribute("data-group");
              handleTaskDelete(taskId);
            });
          });
        }
        else{
            alert("Error in fetching tasks");
        }

    }

    getTasks();

});
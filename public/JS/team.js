document.addEventListener('DOMContentLoaded', function () {

    // Dummy data for people list ❗
    // Backend data will be used instead of this for list of all the associates in a particular team
    const people = ['Person 1', 'Person 2', 'Person 3','Person 4'];

    // Dummy data for table ❗
    // Backend data will be used instead of this for list of coordinators/associates from a team who are assigned to or have completed a task.
    const tableData = [
        { sno: 1, name: 'John Doe', taskTitle:'Design the Holi Poster', status:'Assigned' },
        { sno: 2, name: 'Jane Smith', taskTitle:'Create the writeup for diwali post', status:'Completed' },
        { sno: 3, name: 'Bob Johnson', taskTitle:'Make a painting', status:'Uploaded' }
    ];

    // Populate people list ❗
    const peopleList = document.getElementById('peopleList');
    people.forEach(person => {
        const listItem = document.createElement('li');
        listItem.textContent = person;
        listItem.classList.add('list-group-item');
        peopleList.appendChild(listItem);
    });

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

    //Hide the associates list if Role is of an Associate
    //Done ✅
    let role = "";
    const associateList = document.querySelector('.sidebar');
    if(role === "Associate") {
        associateList.style.display = 'none';
    }
});
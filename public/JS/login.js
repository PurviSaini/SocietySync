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
  
let submitBtn=document.getElementById('submit');
submitBtn.addEventListener('click', async (event) => {
    let username= document.getElementById('username').value;
    let password= document.getElementById('password').value;
    let data = { username, password};
    let response = await postData('/login', data);
    if (response.message === "Login successful") {
    //set details in local storage
    localStorage.setItem('username',username);
    localStorage.setItem('role',response.role);
    localStorage.setItem('team',response.team);
    alert(response.message);
    let role=response.role;
    if(role=="Associate"|| role=="Coordinator"){
        role="Member";
    }
      window.location.href = `/${role}`;
    } else {
    alert("Login up failed. Please try again.");
    }
});



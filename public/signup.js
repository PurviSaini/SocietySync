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
    let name= document.getElementById('name').value;
    let username= document.getElementById('username').value;
    let password= document.getElementById('password').value;
    let team= document.getElementById('team').value;
    let role= document.getElementById('role').value;
    let data = {name, username, password, team, role};
    let response = await postData('/signup', data);
    if (response.message === "Signup successful") {
    alert(response.message);
    } else {
    alert("Sign up failed. Please try again.");
    }
});



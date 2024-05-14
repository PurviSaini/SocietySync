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


// ======================================================================================
// Adding 
const addNotice = document.getElementById("addNotice");
addNotice.addEventListener("click", function () {
  const noticeTitle = document.getElementById("notice-title").value;
  const noticeDescription = document.getElementById("notice-desc").value;

  // dummy data
  const noticeList = [{sno:1, title:noticeTitle, description:noticeDescription}]
  
  noticeList.forEach(row => {
    document.getElementById("notice-list").innerHTML += `<li>
    <h5 class="notice-title">${row.title}</h5>
    ${row.noticeDescription}
  </li>`;
  })
});


// Or use function to add notice
function appendNotice(notices){
    notices.forEach(row => {
        document.getElementById("notice-list").innerHTML += `<li>
        <h5 class="notice-title">${row.title}</h5>
        ${row.description}
      </li>
      <hr />`
    })
}

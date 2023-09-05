// DOM elements
const existingBlogs = document.querySelector("#existingblogs");
const createNew = document.querySelector("#createNew");
const newPost = document.querySelector("#newpost");
const newBlog = document.querySelector("#newBlog");

// Functions
function hideCreateNew() {
  createNew.hidden = true;
}

// Initial setup
hideCreateNew();

// Event listeners
newPost.addEventListener("submit", event => {
  event.preventDefault();
  console.log('New post clicked');
  
  existingBlogs.hidden = true;
  newPost.hidden = true;
  createNew.hidden = false;
});

newBlog.addEventListener("submit", event => {
  event.preventDefault();
  
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  
  console.log('Submit button clicked');
  
  if (!title || !content) {
    alert('Please enter both title and content');
    return;
  }
  
  const blogObj = {
    title,
    content
  };
  
  fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify(blogObj),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      createNew.setAttribute("hidden", "false");
      location.reload();
    } else {
      alert("Error - please try again");
    }
  });
});
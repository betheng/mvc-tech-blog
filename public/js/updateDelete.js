// Add event listener for updating a blog
document.querySelector("#update").addEventListener("click", event => {
    // Prevent default behavior
    event.preventDefault();

    // Get blog ID and the updated content
    const blogId = document.querySelector("#hiddenBlogId").value;
    const editBlog = {
        title: document.querySelector("#editedTitle").value,
        content: document.querySelector("#editedContent").value,
    };

    // Log information for debugging
    console.log(blogId);
    console.log(editBlog);

    // Send a PUT request to update the blog
    fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: JSON.stringify(editBlog),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            console.log("Blog post has been updated");
            location.href = "/dashboard";
        } else {
            alert("Please try again!");
        }
    });
});

// Add event listener for deleting a blog
document.querySelector("#delete").addEventListener("click", event => {
    // Prevent default behavior
    event.preventDefault();

    // Get the blog ID
    const blogId = document.querySelector("#hiddenBlogId").value;

    // Send a DELETE request to remove the blog
    fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
    }).then(res => {
        if (res.ok) {
            console.log("Blog post has been deleted.");
            location.href = "/dashboard";
        } else {
            alert("Please try again!");
        }
    });
});
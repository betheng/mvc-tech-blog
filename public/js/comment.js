// Add event listener for comment submission
document.querySelector("#newComment").addEventListener("submit", event => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Create a comment object
    const comment = {
        body: document.querySelector("#comment").value,
        blogId: document.querySelector("#hiddenCommentId").value
    };

    // Post the comment using fetch API
    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        // Handle server response
        if (res.ok) {
            console.log("Comment posted");
            location.reload();
        } else {
            alert("Please try again");
        }
    });
});
// Add event listener for the signup form submission
document.querySelector("#signup").addEventListener("submit", event => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Create a user object with the entered username and password
    const userObj = {
        username: document.querySelector("#signupUsername").value,
        password: document.querySelector("#signupPassword").value,
    };

    // Log the user object for debugging purposes
    console.log(userObj);

    // Send a signup request using the fetch API
    fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        // Handle the server response
        if (res.ok) {
            console.log("User is signed up!");
            location.href = "/dashboard";
        } else {
            alert("Please try again...");
        }
    });
});
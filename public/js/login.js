// Add event listener for the login form submission
document.querySelector("#login").addEventListener("submit", event => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Create a user object
    const userObj = {
        username: document.querySelector("#loginUsername").value,
        password: document.querySelector("#loginPassword").value,
    };

    // For debugging: print the user object
    console.log(userObj);

    // Send login request using fetch API
    fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        // Handle server response
        if (res.ok) {
            console.log("User is logged in...");
            location.href = "/dashboard";
        } else {
            alert("Please try again...");
        }
    });
});
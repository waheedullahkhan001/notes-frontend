const base_url = "http://localhost:8080/api/v1";

var usernameInput;
var passwordInput;

function setup() {
    usernameInput = document.getElementById('username-input');
    passwordInput = document.getElementById('password-input');
}


function login() {
    let username = usernameInput.value
    let password = passwordInput.value
    
    requestBody = {
        "username": username,
        "password": password
    }

    fetch(base_url + "/auth/login", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        if (response.status == 200) {
            response.json().then(data => {
                localStorage.setItem("token", data.token);
                window.location.href = "app.html";
            })
        }
        else {
            response.json().then(data => {
                alert(data.message);
            })
        }
    });
}


function register() {
    let username = usernameInput.value
    let password = passwordInput.value
    
    requestBody = {
        "username": username,
        "password": password
    }

    fetch(base_url + "/auth/register", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        if (response.status == 200) {
            alert("User created successfully!");
        }
        else {
            response.json().then(data => {
                alert(data.message);
            })
        }
    });
}

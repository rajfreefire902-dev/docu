const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

if (loginForm) {
    loginForm.onsubmit = async function(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch(BASE_URL + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";
        } else {
            alert(data.msg || "Login Failed");
        }
    };
}

if (registerForm) {
    registerForm.onsubmit = async function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch(BASE_URL + "/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";
        } else {
            alert(data.msg || "Registration Failed");
        }
    };
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
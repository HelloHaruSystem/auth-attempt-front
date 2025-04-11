import { secure } from "/secure.js";

// dom elements
const loginForm = document.getElementById("loginForm");
const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");



const login = async () => {
    const userName = usernameField.value;
    const password = passwordField.value;

    try {
        const response = await fetch("http://localhost:5141/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // this is required to send/receive cookies
            body: JSON.stringify({ userName, password})
        });
        
        if (response.ok) {
            const data = await response.json();
            redirectBasedOnRoles(data.role);
        } else {
            errorMessage.innerHTML = "Invalid credentials";
            errorMessage.style.display = "block";
        }
        
    } catch (error) {
        console.error(error);
        errorMessage.innerHTML = "503 Service Unavailable";
        errorMessage.style.display = "block";
    }
};

const redirectBasedOnRoles = roles => {
    if (Array.isArray(roles) && roles.includes("Admin")) {
        window.location.href = "AdminDashboard.html";
    } else {
        window.location.href = "home.html";
    }
};

const autoLogIn = async () => {
    try {
        const response = await secure();

        if (response.ok) {
            const data = await response.json();
            redirectBasedOnRoles(data.role);
        }
    } catch (error) {
        console.error("auto login failed:", error);
    }
};

// run at start
autoLogIn();

// event handlers
loginForm.addEventListener(('submit'), async event => {
    // Not refreshing the page
    event.preventDefault();
    await login();
});
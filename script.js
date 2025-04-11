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
            if (data.role.includes("Admin")) {
                window.location.href = "AdminDashboard.html";
            } else {
                window.location.href = "home.html";
            }
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

const autoLogIn = () => {
    
};

// run at start
autoLogIn();

// event handlers
loginForm.addEventListener(('submit'), async event => {
    // Not refreshing the page
    event.preventDefault();
    await login();
});
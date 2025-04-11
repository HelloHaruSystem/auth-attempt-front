import { secure } from "/secure.js";

// dom elements
const logoutButton = document.getElementById("logout");
const welcomeTitle = document.getElementById("welcome");
const adminButton = document.getElementById("adminDashboard");

const checkAuth = async () => {
    const response = await fetch("http://localhost:5141/api/auth/profile", {
        method: "GET",
        credentials: "include" // sends the cookies
    });

    if (!response.ok) {
        goToIndex();
    } else {
        const data = await response.json();
        welcomeTitle.innerHTML = `Welcome ${data.username}`;
    }
};

const checkAdmin = () => {
    
}

const goToIndex = () => {
    window.location.href = "index.html";
};

const logout = async () => {
    const response = await fetch("http://localhost:5141/api/auth/logout", {
        method: "POST",
        credentials: "include"
    });

    if (response.ok) {
        goToIndex();
    } else {
        console.error("Logout failed.");
    }
};

const buttonIfAdmin = async () => {
    try {
        const response = await secure();

        if (response.ok) {
            const data = await response.json();
            
            if (Array.isArray(data.role) && data.role.includes("Admin")) {
                adminButton.addEventListener("click", () => {
                    window.location.href = "AdminDashboard.html";
                });
                adminButton.style.display = "block";
            }
        }
    } catch (error) {
        console.log(":)")
    }
};

// run at start
checkAuth();
buttonIfAdmin();

// event handlers
logoutButton.addEventListener("click", event => {
    logout();
});
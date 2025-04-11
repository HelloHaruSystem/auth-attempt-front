import { secure } from "./secure.js";

const goIndexButton = document.getElementById("goIndex");
const goHomeButton = document.getElementById("goHome");
const logoutButton = document.getElementById("logout");

const checkAuth = async () => {
    try {
        const response = await secure();
        const data = await response.json();
        if (response.ok) {
            if (!data.role.includes("Admin")) {
                logout();
            }
        } else {
            logout();
        }

    } catch (error) {
        console.error("Access denied");
    }
};

const goToIndex = () => {
    window.location.href = "index.html";
};

const goToHome = () => {
    window.location.href = "home.html";
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

// run at start
checkAuth();

// event handlers
goIndexButton.addEventListener("click", event => {
    goToIndex();
});

goHomeButton.addEventListener("click", event => {
    goToHome();
});

logoutButton.addEventListener("click", event => {
    logout();
});


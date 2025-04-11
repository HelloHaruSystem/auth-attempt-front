// dom elements
const logoutButton = document.getElementById("logout");
const welcomeTitle = document.getElementById("welcome");

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

// run at start
checkAuth();

// event handlers
logoutButton.addEventListener("click", event => {
    logout();
});
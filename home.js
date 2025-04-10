// dom elements
const logoutButton = document.getElementById("logout");
const welcomeTitle = document.getElementById("welcome");

/* This is the checkAuth() function in case of json jwt
const checkAuth = async () =>{
    // json web token
    const token = localStorage.getItem("jwt");
    if (!token) {
        goToIndex();
        return
    }

    const response = await fetch("http://localhost:5141/api/auth/profile", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        logout();
    } else {
        const data = await response.json();
        welcomeTitle.innerHTML = `Welcome ${data.username}`;
    }
}; */

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

const goToIndex = () => {
    window.location.href = "index.html";
};

/* logout function with jwt as json
const logout = () => {
    localStorage.removeItem("jwt");
    goToIndex();
}; */

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
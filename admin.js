const goIndexButton = document.getElementById("goIndex");
const goHomeButton = document.getElementById("goHome");
const logoutButton = document.getElementById("logout");

const checkAuth = async () => {

};

const goToIndex = () => {
    window.location.href = "index.html";
};

const goToHome = () => {
    window.location.href = "home.html";
};

// event handlers
goIndexButton.addEventListener("click", event => {
    goToIndex();
});

goHomeButton.addEventListener("click", event => {
    goToHome();
});


const secure = async () => {
    const response = await fetch("http://localhost:5141/api/auth/secure", {
        method: "GET",
        credentials: "include"
    });

    return response;
};

export { secure };
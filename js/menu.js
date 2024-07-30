 
document.querySelector("#hamburguer").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("menu-show");
});

 
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector("nav").classList.remove("menu-show");
    });
});
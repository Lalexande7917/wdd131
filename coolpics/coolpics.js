const menuButton = document.querySelector(".menu");

function toggleMenu() {
    const menu = document.querySelector("nav");
    menu.classList.toggle("hide");
}

function handleResize() {
    if (window.innerWidth >= 1000) {
        menu.classList.remove("hide");
    } else {
        menu.classList.add("hide");
    }
}

function viewerTemplate(pic, alt) {
    return`
        <div class="viewer">: 
            <button class="close-viewer">X</button>
            <img src="${pic}" alt="${alt}"> 
        </div>
    `;
}

function viewHandler(event) {
    const target = event.target;
    const targetSrc = target.src.split("-");
    const newSrc = targetSrc[0] + "-full.jpeg";
    const viewerHTML = viewerTemplate(newSrc, target.alt);
    document.body.insertAdjacentHTML("afterbegin", viewerHTML);
    const closeViewerButton = document.querySelector(".close-viewer");
    closeViewerButton.addEventListener("click", closeViewer);
}

function closeViewer() {
    const viewer = document.querySelector(".viewer");
    if (viewer) {
        viewer.remove();
    }
}

document.querySelectorAll(".gallery img").forEach(img =>{
    img.addEventListener("click", viewHandler);
});



menuButton.addEventListener("click", toggleMenu);
window.addEventListener("resize", handleResize);
handleResize();
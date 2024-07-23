document.addEventListener("DOMContentLoaded", function() {
    fetch("Hollow.docx")
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onload = function(event) {
                mammoth.convertToHtml({arrayBuffer: event.target.result})
                    .then(result => {
                        const contentBox = document.getElementById('latest-work-content');
                        contentBox.innerHTML = result.value;
                    })
                    .catch(error => console.error('Error converting the latest work:', error));
            };
            reader.readAsArrayBuffer(blob);
        })
        .catch(error => console.error('Error loading the latest work:', error));
});

document.addEventListener('mousemove', (event) => {
    const moveBg = document.querySelector('.move-bg');
    const { clientX: x, clientY: y } = event;
    
    const movementFactor = 45; 
    const movementX = (x / window.innerWidth) * movementFactor;
    const movementY = (y / window.innerHeight - .6) * movementFactor;

    moveBg.style.transform = `translate(-${movementX}px, -${movementY}px) scale(1.1)`;
});

document.addEventListener('DOMContentLoaded', function() {
    const poetryGrid = document.getElementById('poetry-grid');
    const shuffleButton = document.getElementById('shuffle-button');
    let draggedElement = null;

    poetryGrid.addEventListener('dragstart', function(event) {
        draggedElement = event.target;
        event.target.classList.add('dragging');
    });

    poetryGrid.addEventListener('dragend', function(event) {
        event.target.classList.remove('dragging');
     
        const poems = [...poetryGrid.querySelectorAll('.poem')];
        poems.forEach(poem => poem.style.transition = 'none');  
        setTimeout(() => poems.forEach(poem => poem.style.transition = 'transform 0.3s ease'), 0); 
    });

    poetryGrid.addEventListener('dragover', function(event) {
        event.preventDefault();
        const afterElement = getDragAfterElement(poetryGrid, event.clientY);
        const dragging = document.querySelector('.dragging');
        if (afterElement == null) {
            poetryGrid.appendChild(dragging);
        } else {
            poetryGrid.insertBefore(dragging, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.poem:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function shufflePoems() {
        const poems = [...poetryGrid.querySelectorAll('.poem')];
        for (let i = poems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            poetryGrid.appendChild(poems[j]);
        }
    }

    shuffleButton.addEventListener('click', shufflePoems);
});

document.addEventListener('DOMContentLoaded', function() {
    const shuffleButton = document.querySelector('#shuffle-button');
    const poems = document.querySelectorAll('.poem');
    const numPoems = poems.length;
    
    shuffleButton.addEventListener('click', () => {

        poems.forEach(poem => {
            poem.classList.add('hidden');
        });


        setTimeout(() => {
            const shuffledPoems = Array.from(poems);
            shuffledPoems.sort(() => Math.random() - 0.5); 

            shuffledPoems.forEach((poem, index) => {
                poem.classList.remove('hidden');
                poem.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360 - 180}deg)`;
            });
        }, 100); 
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const essayGrid = document.getElementById('essay-grid');
    const essayFiles = [
        'essays/eyes.docx',
        'essays/fathers_love.docx',
        'essays/trinity.docx'
    ];

    function loadEssay(filePath, index) {
        fetch(filePath)
            .then(response => response.arrayBuffer())
            .then(data => mammoth.convertToHtml({ arrayBuffer: data }))
            .then(result => {
                const essay = document.createElement('article');
                essay.classList.add('essay');
                essay.innerHTML = `<h3>Essay ${index + 1}</h3>${result.value}`;
                essayGrid.appendChild(essay);
            })
            .catch(error => console.error('Error loading essay:', error));
    }

    essayFiles.forEach((file, index) => loadEssay(file, index));
});

document.addEventListener('DOMContentLoaded', function() {
    const essayGrid = document.getElementById('essay-grid');
    const modal = document.getElementById('essay-modal');
    const modalContent = document.getElementById('modal-essay-content');
    const closeBtn = document.querySelector('.modal .close');

   
    essayGrid.addEventListener('click', function(event) {
        if (event.target.closest('.essay')) {
            const essay = event.target.closest('.essay');
            modalContent.innerHTML = essay.innerHTML; 
            modal.style.display = 'block'; 
        }
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const fictionGrid = document.getElementById('fiction-grid');
    const fictionModal = document.getElementById('fiction-modal');
    const modalContent = document.getElementById('modal-fiction-content');
    const closeModal = document.querySelector('.modal .close');

    const fictionFiles = [
        'fiction/Hollow.docx'
    ];

    function loadFiction(filePath, index) {
        fetch(filePath)
            .then(response => response.arrayBuffer())
            .then(data => mammoth.convertToHtml({ arrayBuffer: data }))
            .then(result => {
                const story = document.createElement('article');
                story.classList.add('story');
                story.innerHTML = `<h3>Story ${index + 1}</h3>${result.value}`;
                story.addEventListener('click', () => {
                    modalContent.innerHTML = result.value; 
                    fictionModal.style.display = 'flex'; 
                });
                fictionGrid.appendChild(story);
            })
            .catch(error => console.error('Error loading fiction story:', error));
    }

    fictionFiles.forEach((file, index) => loadFiction(file, index));


    closeModal.addEventListener('click', () => {
        fictionModal.style.display = 'none'; 
    });

    window.addEventListener('click', (event) => {
        if (event.target === fictionModal) {
            fictionModal.style.display = 'none'; 
        }
    });
});

const themeSelector = document.getElementById('Mode');

function changeTheme() {
    if (themeSelector.value === 'dark') {
        document.body.classList.add('dark');

        const logo = document.querySelector('img');
        logo.src = 'byui-logo_white.png';
    } else {
        document.body.classList.remove('dark');

        const logo = document.querySelector('img');
        logo.src = 'byui-logo_blue.webp'
    }
   

}

themeSelector.addEventListener('click', changeTheme);
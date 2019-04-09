let navbarElements = document.querySelectorAll('.top-navbar > ul > li'),
    menuLinks = document.querySelectorAll('.menu > li > a'),
    submenuLinks = document.querySelectorAll('ul.menu > li > ul.submenu > li > a');

navbarElements.forEach(function (elem) {
    elem.addEventListener('mouseover', showNavbarSubmenu, false);
    elem.addEventListener('mouseout', hideNavbarSubmenu, false);
});

menuLinks.forEach(function (elem) {
    elem.addEventListener('click', chooseAccordionTab, false);
});

submenuLinks.forEach(function (elem) {
    elem.addEventListener('click', chooseSlide, false);
});

function showNavbarSubmenu() {
    let submenu = this.querySelector('ul');
    
    if (submenu) {
        submenu.classList.add('visible');
    }
}

function hideNavbarSubmenu() {
    let submenu = this.querySelector('ul');
    
    if (submenu) {
        submenu.classList.remove('visible');
    }
}

function chooseAccordionTab() {
    let targetBlock = this.dataset.target;
    
    document.querySelector(targetBlock + ' > .block-header').click();
}

function chooseSlide() {
    let paginationButtons = document.querySelectorAll('input.pagination-button'),
        targetSlide = Number(this.dataset.target),
        targetBlock = this.parentNode.parentNode.previousElementSibling.dataset.target;

    document.querySelector(targetBlock + ' > .block-header').click();
    stopTimer();
    paginationButtons[targetSlide - 1].click();
    scrollImagesByTimer();
}

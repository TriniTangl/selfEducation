// Show and hide navbar submenu
let arrayNavbarElements = document.querySelectorAll('.top-navbar > ul > li');

arrayNavbarElements.forEach(function (elem) {
    elem.addEventListener('mouseover', showNavbarSubmenu, false);
    elem.addEventListener('mouseout', hideNavbarSubmenu, false);
});

function showNavbarSubmenu() {
    let submenu = this.querySelector('ul');
    
    if (submenu) submenu.classList.add('hover');
}

function hideNavbarSubmenu() {
    let submenu = this.querySelector('ul');
    
    if (submenu) submenu.classList.remove('hover');
}

// Show and hide accordion blocks, when to do click on link menu
let arrayLinksMenu = document.querySelectorAll('.menu > li > a');

arrayLinksMenu.forEach(function (elem) {
    elem.addEventListener('click', showAccordionBlocksBodyWhenChosenLink, false);
});

function showAccordionBlocksBodyWhenChosenLink() {
    let targetBlock = this.dataset.target;
    
    document.querySelector(targetBlock + '>.block-header').click();
}

// Show slide, when to do click on link submenu
let arrayLinkSubmenu = document.querySelectorAll('ul.menu > li > ul.submenu > li > a');

arrayLinkSubmenu.forEach(function (elem) {
    elem.addEventListener('click', setSlideUsingSidebarLink, false);
});

function setSlideUsingSidebarLink() {
    let arraySliderPaginationElements = document.querySelectorAll('input.slider-switch'),
        targetSlide = Number(this.dataset.target),
        targetBlock = this.parentNode.parentNode.parentNode.querySelector('a').dataset.target;

    document.querySelector(targetBlock + ' > .block-header').click();
    stopTimer();
    arraySliderPaginationElements[targetSlide - 1].click();
    scrollImagesByTimer();
}

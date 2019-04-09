let accordionTabs = document.querySelectorAll('.accordion > .block');

accordionTabs.forEach(function (elem) {
    elem.querySelector('.block-header').addEventListener('click', showAccordionTabBody, false);
});

function showAccordionTabBody() {
    let body = this.parentNode.querySelector('.block-body');
    
    if (this.classList.contains('active') && body.classList.contains('active')) {
        return;
    }
    
    accordionTabs.forEach(function (elem) {
        elem.querySelector('.block-header').classList.remove('active');
        elem.querySelector('.block-body').classList.remove('active');
    });
    
    this.classList.add('active');
    body.classList.add('active');
    resizeSlider();
}

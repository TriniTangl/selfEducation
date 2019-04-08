// Show and hide accordion blocks
let arrayAccordionBlocks = document.querySelectorAll('.accordion > .block');

arrayAccordionBlocks.forEach(function (elem) {
    elem.querySelector('.block-header').addEventListener('click', showAccordionBlocksBody, false);
});

function showAccordionBlocksBody() {
    console.log(true);
    let blockBody = this.parentNode.querySelector('.block-body');
    
    if (this.classList.contains('active') && blockBody.classList.contains('active')) {
        return;
    }
    
    arrayAccordionBlocks.forEach(function (elem) {
        elem.querySelector('.block-header').classList.remove('active');
        elem.querySelector('.block-body').classList.remove('active');
    });
    
    this.classList.add('active');
    blockBody.classList.add('active');
    autoResizeSliderArea();
}

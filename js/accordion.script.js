// Show and hide accordion blocks
let arrayAccordionBlocks = document.querySelectorAll('.accordion>.block');

arrayAccordionBlocks.forEach(function (elem) {
    elem.querySelector('.block-header').addEventListener('click', showAccordionBlocksBody, false);
});

function showAccordionBlocksBody() {
    let parentNodeBlock = this.parentNode,
        blockBody = parentNodeBlock.querySelector('.block-body');
    
    if (!(this.classList.contains('active') && blockBody.classList.contains('show'))) {
        arrayAccordionBlocks.forEach(function (elem) {
            elem.querySelector('.block-header').classList.remove('active');
            elem.querySelector('.block-body').classList.remove('show');
        });
        
        this.classList.add('active');
        blockBody.classList.add('show');
        autoResizeSliderArea();
    }
}
let images = document.querySelectorAll('.slider-wrapper > img'),
    leftButton = document.querySelector('button.button-left'),
    rightButton = document.querySelector('button.button-right'),
    sliderWrapper = document.querySelector('div.slider-wrapper'),
    sliderContainer = document.querySelector('div.slider-container'),
    paginationContainer = document.querySelector('div.slider-pagination'),
    timerAutoSwitchSlide;

window.addEventListener('load', onload, false);
window.addEventListener('resize', resizeSlider, false);

sliderContainer.addEventListener('mouseover', stopTimer, false);
sliderContainer.addEventListener('mouseout', scrollImagesByTimer, false);

paginationContainer.addEventListener('mouseover', stopTimer, false);
paginationContainer.addEventListener('mouseout', scrollImagesByTimer, false);

leftButton.addEventListener('click', scrollSlide, false);
rightButton.addEventListener('click', scrollSlide, false);

function onload() {
    generatePagination();
    setActiveClassSlide();
    resizeSlider();
    scrollImagesByTimer();
}

function resizeSlider() {
    let widthButtonsSlider = leftButton.offsetWidth,
        marginButtonsSlider = Number(window.getComputedStyle(leftButton).marginRight.replace(/\D+/g, '')),
        widthSlider = sliderContainer.offsetWidth - ((widthButtonsSlider + marginButtonsSlider) * 2),
        heightSlider = 0;
    
    for (let i = 0; i < images.length; i++) {
        if (images[i].naturalWidth > widthSlider) {
            let newImageHeight, coefficient;
            
            coefficient = widthSlider / images[i].naturalWidth;
            newImageHeight = images[i].naturalHeight * coefficient;
            
            if (heightSlider < newImageHeight) {
                heightSlider = newImageHeight;
            }
        } else if (heightSlider < images[i].naturalHeight) {
            heightSlider = images[i].naturalHeight;
        }
    }
    
    sliderWrapper.style.height = Math.round(heightSlider) + 'px';
}

function scrollSlide() {
    let dynamicImagesList = document.querySelectorAll('.slider-wrapper > img');
    for (let i = 0; dynamicImagesList.length; i++) {
        if (dynamicImagesList[i].classList.contains('active')) {
            const scrollLeft = this.classList.contains('button-left');
            const direction = scrollLeft ? 'left' : 'right';
            const nextImageIndex = scrollLeft ? i - 1 : 1 + 1;
            
            moveImage(direction, dynamicImagesList);
            unsetActiveClassSlide(dynamicImagesList[i]);
            
            dynamicImagesList[nextImageIndex].classList.add('active');
            dynamicImagesList[nextImageIndex].style.maxWidth = dynamicImagesList[nextImageIndex].naturalWidth + 'px';
    
            for (let j = 0; j < images.length; j++) {
                if (images[j] === dynamicImagesList[nextImageIndex]) {
                    setActivePagination(j);
                }
            }

            break;
        }
    }
}

function setActiveClassSlide() {
    let isSlideActive = false;
    
    if (images[0].classList.contains('active')) {
        moveImage('left', images);
        setActivePagination(0);
    } else if (images[images.length - 1].classList.contains('active')) {
        moveImage('right', images);
        setActivePagination(images.length - 1);
    } else {
        for (let i = 1; i < images.length - 1; i++) {
            if (images[i].classList.contains('active')) {
                setActivePagination(i);
                isSlideActive = true;
                break;
            }
        }
        
        if (isSlideActive === false || !isSlideActive) {
            images[0].classList.add('active');
        }
        moveImage('left', images);
        setActivePagination(0);
    }
}

function moveImage(position, arraySlides) {
    switch (position) {
        case 'left':
            sliderWrapper.insertBefore(arraySlides[arraySlides.length - 1], sliderWrapper.firstChild);
            break;
        case 'right':
            sliderWrapper.insertBefore(arraySlides[0], null);
            break;
        default:
            break;
    }
}

function generatePagination() {
    let elementPagination = document.createElement('input');
    
    elementPagination.classList.add('pagination-button');
    elementPagination.name = 'slider-switch';
    elementPagination.type = 'radio';
    for (let i = 0; i < images.length; i++) {
        let temp = elementPagination.cloneNode(true);
        
        temp.addEventListener('click', switchImagePagination, false);
        paginationContainer.appendChild(temp);
    }
}

function setActivePagination(position) {
    let paginationButtons = document.querySelectorAll('input.pagination-button');
    
    paginationButtons[position].checked = true;
}

function switchImagePagination() {
    let paginationButtons = document.querySelectorAll('input.pagination-button'),
        dynamicImagesList = document.querySelectorAll('.slider-wrapper > img');
    
    for (let i = 0; i < paginationButtons.length; i++) {
        if (paginationButtons[i].checked) {
            if (dynamicImagesList[0] === images[i]) {
                moveImage('left', dynamicImagesList);
                setActiveClassSlidePagination(i);
            } else if (dynamicImagesList[dynamicImagesList.length - 1] === images[i]) {
                moveImage('right', dynamicImagesList);
                setActiveClassSlidePagination(i);
            } else {
                setActiveClassSlidePagination(i);
            }
        }
    }
}

function setActiveClassSlidePagination(position) {
    for (let i = 0; i < images.length; i++) {
        unsetActiveClassSlide(images[i]);
    }
    images[position].classList.add('active');
    images[position].style.maxWidth = images[position].naturalWidth + 'px';
}

function scrollImagesByTimer() {
    let paginationButtons = document.querySelectorAll('input.pagination-button'),
        iterator;
    
    for (let i = 0; i < paginationButtons.length; i++) {
        if (paginationButtons[i].checked) {
            iterator = i;
            break;
        }
    }
    
    timerAutoSwitchSlide = setTimeout(tick, 2000);
    
    function tick() {
        paginationButtons[iterator].click();
        
        if (iterator === paginationButtons.length - 1) {
            iterator = 0;
        } else {
            iterator++;
        }
        timerAutoSwitchSlide = setTimeout(tick, 2000);
    }
}

function stopTimer() {
    clearTimeout(timerAutoSwitchSlide);
}

function unsetActiveClassSlide(slide) {
    slide.classList.remove('active');
    slide.style = '';
}

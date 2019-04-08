let arrayImages = document.querySelectorAll('.slider-wrapper>img'),
    buttonLeft = document.querySelector('button.button-left'),
    buttonRight = document.querySelector('button.button-right'),
    sliderWrapper = document.querySelector('div.slider-wrapper'),
    sliderContainer = document.querySelector('div.slider-container'),
    sliderPaginationContainer = document.querySelector('div.slider-pagination'),
    timerForAutoSwitchImages;

window.addEventListener('load', callFunctionForOnloadEventWindow, false);
window.addEventListener('resize', autoResizeSliderArea, false);

sliderContainer.addEventListener('mouseover', stopTimer, false);
sliderContainer.addEventListener('mouseout', scrollImagesByTimer, false);

sliderPaginationContainer.addEventListener('mouseover', stopTimer, false);
sliderPaginationContainer.addEventListener('mouseout', scrollImagesByTimer, false);

buttonLeft.addEventListener('click', scrollImagesToLeft, false);
buttonRight.addEventListener('click', scrollImagesToRight, false);

function callFunctionForOnloadEventWindow() {
    generateSliderPagination();
    setClassActiveSlideForImageWhenPageLoad();
    autoResizeSliderArea();
    scrollImagesByTimer();
}

function autoResizeSliderArea() {
    let widthButtonSlider = buttonLeft.offsetWidth,
        marginSideButtonSlider = Number(window.getComputedStyle(buttonLeft).marginRight.replace(/\D+/g, '')),
        widthSliderArea = sliderContainer.offsetWidth - ((widthButtonSlider + marginSideButtonSlider) * 2),
        heightSliderArea = 0;
    
    for (let i = 0; i < arrayImages.length; i++) {
        if (arrayImages[i].naturalWidth > widthSliderArea) {
            let newImageNaturalHeight, coefficient;
            
            coefficient = widthSliderArea / arrayImages[i].naturalWidth;
            newImageNaturalHeight = arrayImages[i].naturalHeight * coefficient;
            
            if (heightSliderArea < newImageNaturalHeight) heightSliderArea = newImageNaturalHeight;
        } else {
            if (heightSliderArea < arrayImages[i].naturalHeight) heightSliderArea = arrayImages[i].naturalHeight;
        }
    }
    
    sliderWrapper.style.height = Math.round(heightSliderArea) + 'px';
}

function scrollImagesToLeft() {
    let dynamicArrayImages = document.querySelectorAll('.slider-wrapper>img');
    for (let i = 0; i < dynamicArrayImages.length; i++) {
        if (dynamicArrayImages[i].classList.contains('active-slide')) {
            if (i - 1 <= 0) {
                changePlaceImageInSliderList('left', dynamicArrayImages);
            }
            
            dynamicArrayImages[i].classList.remove('active-slide');
            dynamicArrayImages[i].style = '';
            dynamicArrayImages[i - 1].classList.add('active-slide');
            dynamicArrayImages[i - 1].style.maxWidth = dynamicArrayImages[i - 1].naturalWidth + 'px';
            for (let j = 0; j < arrayImages.length; j++) {
                if (arrayImages[j] === dynamicArrayImages[i - 1]) {
                    setActiveElementSliderPagination(j);
                }
            }
            break;
        }
    }
}

function scrollImagesToRight() {
    let dynamicArrayImages = document.querySelectorAll('.slider-wrapper>img');
    for (let i = dynamicArrayImages.length - 1; i >= 0; i--) {
        if (dynamicArrayImages[i].classList.contains('active-slide')) {
            if (i + 1 === dynamicArrayImages.length - 1) {
                changePlaceImageInSliderList('right', dynamicArrayImages);
            }
            
            dynamicArrayImages[i].classList.remove('active-slide');
            dynamicArrayImages[i].style = '';
            dynamicArrayImages[i + 1].classList.add('active-slide');
            dynamicArrayImages[i + 1].style.maxWidth = dynamicArrayImages[i + 1].naturalWidth + 'px';
                for (let j = 0; j < arrayImages.length; j++) {
                if (arrayImages[j] === dynamicArrayImages[i + 1]) {
                    setActiveElementSliderPagination(j);
                }
            }
            break;
        }
    }
}

function setClassActiveSlideForImageWhenPageLoad() {
    let isElementHaveClass = false; // HAS A REVERSE EFFECT!!!
    
    if (arrayImages[0].classList.contains('active-slide')) {
        changePlaceImageInSliderList('left', arrayImages);
        setActiveElementSliderPagination(0);
    } else if (arrayImages[arrayImages.length - 1].classList.contains('active-slide')) {
        changePlaceImageInSliderList('right', arrayImages);
        setActiveElementSliderPagination(arrayImages.length - 1);
    } else {
        for (let i = 1; i < arrayImages.length - 1; i++) {
            if (arrayImages[i].classList.contains('active-slide')) {
                setActiveElementSliderPagination(i);
                isElementHaveClass = true;
                break;
            }
        }
        
        if (!isElementHaveClass) arrayImages[0].classList.add('active-slide'); // (!isElementHaveClass)
        changePlaceImageInSliderList('left', arrayImages);
        setActiveElementSliderPagination(0);
    }
}

function changePlaceImageInSliderList(switchPosition, arrayElements) {
    switch (switchPosition) {
        case 'left':
            sliderWrapper.insertBefore(arrayElements[arrayElements.length - 1], sliderWrapper.firstChild);
            break;
        case 'right':
            sliderWrapper.insertBefore(arrayElements[0], null);
            break;
        default:
            break;
    }
}

function generateSliderPagination() {
    let elementPagination = document.createElement('input');
    
    elementPagination.classList.add('slider-switch');
    elementPagination.name = 'slider-switch-button';
    elementPagination.type = 'radio';
    for (let i = 0; i < arrayImages.length; i++) {
        let temp = elementPagination.cloneNode(true);
        
        temp.addEventListener('click', switchImageUsingSliderPagination, false);
        sliderPaginationContainer.appendChild(temp);
    }
}

function setActiveElementSliderPagination(position) {
    let arraySliderPaginationElements = document.querySelectorAll('input.slider-switch');
    
    arraySliderPaginationElements[position].checked = true;
}

function switchImageUsingSliderPagination() {
    let arraySliderPaginationElements = document.querySelectorAll('input.slider-switch'),
        dynamicArrayImages = document.querySelectorAll('.slider-wrapper>img');
    
    for (let i = 0; i < arraySliderPaginationElements.length; i++) {
        if (arraySliderPaginationElements[i].checked) {
            if (dynamicArrayImages[0] === arrayImages[i]) {
                changePlaceImageInSliderList('left', dynamicArrayImages);
                setClassActiveSlideForImageUsingSliderPagination(i);
            } else if (dynamicArrayImages[dynamicArrayImages.length - 1] === arrayImages[i]) {
                changePlaceImageInSliderList('right', dynamicArrayImages);
                setClassActiveSlideForImageUsingSliderPagination(i);
            } else {
                setClassActiveSlideForImageUsingSliderPagination(i);
            }
        }
    }
}

function setClassActiveSlideForImageUsingSliderPagination(position) {
    for (let i = 0; i < arrayImages.length; i++) {
        arrayImages[i].classList.remove('active-slide');
        arrayImages[i].style = '';
    }
    arrayImages[position].classList.add('active-slide');
    arrayImages[position].style.maxWidth = arrayImages[position].naturalWidth + 'px';
}

function scrollImagesByTimer() {
    let arraySliderPaginationElements = document.querySelectorAll('input.slider-switch'),
        iterator;
    
    for (let i = 0; i < arraySliderPaginationElements.length; i++) {
        if (arraySliderPaginationElements[i].checked) {
            iterator = i;
            break;
        }
    }
    
    timerForAutoSwitchImages = setTimeout(tick, 2000);
    
    function tick() {
        arraySliderPaginationElements[iterator].click();
        
        if (iterator === arraySliderPaginationElements.length - 1) {
            iterator = 0;
        } else {
            iterator++;
        }
        timerForAutoSwitchImages = setTimeout(tick, 2000);
    }
}

function stopTimer() {
    clearTimeout(timerForAutoSwitchImages);
}
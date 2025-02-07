// for offers section
const sliderContainer = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
const scrollbarThumb = document.querySelector('.custom-scroll')
const scrollbarContainer = document.querySelector('.scrollbar-container-inner')

sliderFunctionality(sliderContainer, slider, scrollbarThumb, scrollbarContainer)//invoke function


// for products section
const prodSection = document.querySelector('.section-products')
const prodsliderContainer = prodSection.querySelector('.slider-container')
const prodSlider = prodSection.querySelector('.slider')
const prodScrollbarThumb = prodSection.querySelector('.custom-scroll')
const prodScrollbarContainer = prodSection.querySelector('.scrollbar-container-inner')

sliderFunctionality(prodsliderContainer, prodSlider, prodScrollbarThumb, prodScrollbarContainer) // invoke function


// for rewards section
const rewSection = document.querySelector('.section-rewards')
const rewsliderContainer = rewSection.querySelector('.slider-container')
const rewSlider = rewSection.querySelector('.slider')
const rewScrollbarThumb = rewSection.querySelector('.custom-scroll')
const rewScrollbarContainer = rewSection.querySelector('.scrollbar-container-inner')
 
sliderFunctionality(rewsliderContainer, rewSlider, rewScrollbarThumb, rewScrollbarContainer) //invoke function


function sliderFunctionality(sliderContainer, slider, scrollbarThumb, scrollbarContainer) {
    // Store the initial translateX value in pixels
    slider.dataset.mouseDownAt = '0';
    slider.dataset.prevTranslateX = '0';
    slider.dataset.translateX = '0';
    let mouseDelta = 0

    const handleOnDown = (clientX) => {
        slider.style.transition = `none`
        slider.style.cursor = 'grabbing'
        scrollbarThumb.style.transition = `none`
        
        mouseDelta = 0
        slider.dataset.mouseDownAt = clientX;
    };

    const handleOnUp = () => {
        slider.style.transition = `all 0.4s`
        slider.style.cursor = 'grab'
        scrollbarThumb.style.transition = `all 0.4s`

        slider.dataset.mouseDownAt = '0';
        //// Check slider and sliderContainer Rects to pass it down to checkBoundary function
        let sliderRectRight = slider.getBoundingClientRect().right
        const sliderContainerRectRight = sliderContainer.getBoundingClientRect().right
        const sliderWidth = slider.getBoundingClientRect().width
        const sliderContainerWidth = sliderContainer.getBoundingClientRect().width 
                
        //put current position in a variable
        let currentPosition = parseFloat(slider.dataset.translateX)

        // slider movement after mouseup// 
        if (mouseDelta > 160) {
        slider.style.transform = `translateX(${currentPosition - 160}px)`;
        slider.dataset.prevTranslateX = currentPosition - 160;
        sliderRectRight -= 160
    }  else if (mouseDelta < -160) {
        slider.style.transform = `translateX(${currentPosition + 160}px)`;
        slider.dataset.prevTranslateX = currentPosition + 160;
    } else if (mouseDelta > 80) {
        slider.style.transform = `translateX(${currentPosition - 80}px)`;
        slider.dataset.prevTranslateX = currentPosition - 80;
        sliderRectRight -= 80
    } else if (mouseDelta < -80) {
        slider.style.transform = `translateX(${currentPosition + 80}px)`;
        slider.dataset.prevTranslateX = currentPosition + 80;
    } else {
        slider.style.transform = `translateX(${slider.dataset.prevTranslateX}px)`;
    } 

    //check boundaries after mouseup
    checkBoundary(sliderRectRight, sliderContainerRectRight, sliderWidth, sliderContainerWidth)
    };

    const handleOnMove = (clientX) => {
        if (slider.dataset.mouseDownAt === '0') return;
        mouseDelta = parseFloat(slider.dataset.mouseDownAt) - clientX;
        const nextTranslateX = parseFloat(slider.dataset.prevTranslateX) - mouseDelta;
        slider.dataset.translateX = nextTranslateX;
        slider.style.transform = `translateX(${nextTranslateX}px)`;

        updateScrollbar(slider.dataset.translateX)
    };
    const checkBoundary = (sliderRectRight, sliderContainerRectRight, sliderWidth, sliderContainerWidth) => {

        if (parseFloat(slider.dataset.prevTranslateX) > 0) {
            slider.style.transform = 'translateX(0px)';
            slider.dataset.prevTranslateX = '0';
        } else if (sliderRectRight < sliderContainerRectRight) {
            slider.style.transform = `translateX(${sliderContainerWidth - sliderWidth}px)`;
            slider.dataset.prevTranslateX = sliderContainerWidth - sliderWidth;
        }
        //update scrollbar position while moving the slider
        updateScrollbar(slider.dataset.prevTranslateX)
    }

    sliderContainer.addEventListener('mousedown', (e) => handleOnDown(e.clientX));
    sliderContainer.addEventListener('mouseup', () => handleOnUp());
    sliderContainer.addEventListener('mousemove', (e) => handleOnMove(e.clientX));

    sliderContainer.addEventListener('touchstart', (e) => handleOnDown(e.touches[0].clientX));
    sliderContainer.addEventListener('touchend', () => handleOnUp());
    sliderContainer.addEventListener('touchmove', (e) => {
        e.preventDefault();
        handleOnMove(e.touches[0].clientX);
    });

    // scrollbar position functionality
    function updateScrollbar(leftPosition) {
        const sliderLeft = parseFloat(leftPosition)
        const sliderWidth = slider.offsetWidth;
        const containerWidth = sliderContainer.offsetWidth;
        const scrollbarWidth = scrollbarContainer.offsetWidth;
        const thumbWidth = scrollbarThumb.offsetWidth;

        const maxSliderMovement = sliderWidth - containerWidth;
        const maxScrollbarMovement = scrollbarWidth - thumbWidth;

        let percentage = sliderLeft / maxSliderMovement;
        
        scrollbarThumb.style.left = - (percentage * maxScrollbarMovement) + 'px';
    }

    // no scrollbar for big screens if theres no more than 3 cards
    function checkCardCount () {
        if(window.innerWidth > 1439) {
        let cardsCount = sliderContainer.querySelectorAll('.card').length
        scrollbarContainer.style.display = cardsCount <= 3 ? 'none' : 'block'
    } else {
        scrollbarContainer.style.display = 'block'
    }
    }
    //call checkCardCount
    checkCardCount()
    window.addEventListener('resize', checkCardCount)
}





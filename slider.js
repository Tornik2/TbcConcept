const sliderContainer = document.querySelector('.slider-container')
const slider = document.querySelector('.slider')
const scrollbarThumb = document.querySelector('.custom-scroll')
const scrollbarContainer = document.querySelector('.scrollbar-container-inner')






sliderContainer.addEventListener('wheel', (e) => {
    e.preventDefault()
})


let isPressed
let startX
let x
let sliderStartPosition 
let sliderCurrentPosition = 0


const getTouchOffsetX = (e) => {
  let sliderRect = slider.getBoundingClientRect()
  return e.touches[0].clientX - sliderRect.left
}

function updateScrollbar() {
    const sliderLeft = sliderCurrentPosition
    const sliderWidth = slider.offsetWidth;
    const containerWidth = sliderContainer.offsetWidth;
    const scrollbarWidth = scrollbarContainer.offsetWidth;
    const thumbWidth = scrollbarThumb.offsetWidth;

    const maxSliderMovement = sliderWidth - containerWidth;
    const maxScrollbarMovement = scrollbarWidth - thumbWidth;

    let percentage = sliderLeft / maxSliderMovement;
    
    scrollbarThumb.style.left = - (percentage * maxScrollbarMovement) + 'px';
}


const start = (e) => {
    
    isPressed = true
    // remove transition from slider
    slider.style.transition = `none`
    scrollbarThumb.style.transition = `none`

    if(e.touches) {
        let touchOffsetX = getTouchOffsetX(e)
        startX = touchOffsetX - slider.offsetLeft
    } else {
            startX  =  e.offsetX - slider.offsetLeft
    }
    sliderStartPosition = Number(slider.style.left.slice(0, -2))
    updateScrollbar()
}

const end = () => {
    isPressed = false
// give slider a smooth transition after swipe
    slider.style.transition = `all 0.4s`
    scrollbarThumb.style.transition = `all 0.4s`
// Check slider and sliderContainer Rects and pass it down to checkBoundary function
let sliderRectRight = slider.getBoundingClientRect().right
const sliderContainerRectRight = sliderContainer.getBoundingClientRect().right
const sliderWidth = slider.getBoundingClientRect().width
const sliderContainerWidth = sliderContainer.getBoundingClientRect().width

    sliderCurrentPosition = parseInt(slider.style.left)
    let dragDistanceX = sliderStartPosition - sliderCurrentPosition
    if (dragDistanceX > 160) {
    slider.style.left = `${sliderCurrentPosition - 160}px`
    sliderCurrentPosition -= 160 
    sliderRectRight = sliderRectRight - 160
   }  else if (dragDistanceX < -160) {
    slider.style.left = `${sliderCurrentPosition + 160}px`
    sliderCurrentPosition += 160
   } else if (dragDistanceX > 80) {
    slider.style.left = `${sliderCurrentPosition - 80}px`
    sliderCurrentPosition -= 80
   } else if (dragDistanceX < -80) {
    slider.style.left = `${sliderCurrentPosition + 80}px`
    sliderCurrentPosition += 80
   } else {
    slider.style.left = `${sliderStartPosition}px`
    sliderCurrentPosition = sliderStartPosition
   } 
   console.log(sliderRectRight)
   checkBoundary(sliderRectRight, sliderContainerRectRight, sliderWidth, sliderContainerWidth)
    


}

const move = (e) => {
    if(!isPressed) return
    e.preventDefault()
    
    sliderCurrentPosition = parseInt(window.getComputedStyle(slider).left, 10);
    
    if(e.touches) {
        x = getTouchOffsetX(e)
        slider.style.left = `${x - startX}px`
    } else {
        x = e.offsetX
        slider.style.left = `${x - startX}px`
       
    }
    updateScrollbar()
}

const checkBoundary = (sliderRectRight, sliderContainerRectRight, sliderWidth, sliderContainerWidth) => {
    
    if (parseInt(slider.style.left) > 0) {
        slider.style.left = '0px'
        sliderCurrentPosition = 0
    } else if (sliderRectRight < sliderContainerRectRight) {
        slider.style.left = `${sliderContainerWidth - sliderWidth}px`
        sliderCurrentPosition = parseInt(slider.style.left)
    }
    updateScrollbar()
}



(()=> {
sliderContainer.addEventListener('mousedown', start)
sliderContainer.addEventListener('mouseup', end)
sliderContainer.addEventListener('mousemove', move)

sliderContainer.addEventListener('touchstart', start)
sliderContainer.addEventListener('touchend', end)
sliderContainer.addEventListener('touchmove', move)
})()

function updateSliderContainerHeight() {
    if (window.innerWidth > 767) {
        sliderContainer.style.height = (slider.offsetHeight +38)+ 'px'
    } else if (window.innerWidth > 479) {
        sliderContainer.style.height = (slider.offsetHeight +28)+ 'px'
    } else {
        sliderContainer.style.height = (slider.offsetHeight +20)+ 'px'
    }
    
}
document.addEventListener('DOMContentLoaded', updateSliderContainerHeight)
updateSliderContainerHeight()
window.addEventListener('resize', () => {
    updateSliderContainerHeight()
})
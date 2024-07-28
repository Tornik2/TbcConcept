const header = document.getElementById('header-container')
const menuToggleIcon = document.getElementById('menuToggle')
const navigation = document.querySelector('.navigation')

//for nav dropdowns
const dropdowns = document.querySelectorAll('.dropdown-list')
const navItems = document.querySelectorAll('.nav-list-item')

//for footer dropdows 
const footerItems = document.querySelectorAll('.footer-list-item')
const footerDropdowns = document.querySelectorAll('.footer-dropdown-list')

//invoke functoin
toggleDropdowns(navItems, dropdowns)
toggleDropdowns(footerItems, footerDropdowns)


//change header background color and toggle navigation when clicked on burgermenu
menuToggleIcon.addEventListener('click', function() {
    this.classList.toggle('active');
    navigation.classList.toggle('active')
    if(menuToggleIcon.classList.contains('active')) {
        header.style.backgroundColor =  "#f9fafa"
    } else {
        header.style.backgroundColor =  "#fff"
    }
});



//dropdown list functionality
function toggleDropdowns(elArray, dropdownsArray) {
    elArray.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation()
            elArray.forEach((otherItem, idx) => {
                if(otherItem !== item) {
                    dropdownsArray[idx].style.maxHeight = '0px'
                    otherItem.classList.remove('active')
                }
            })
            if(item.classList.contains('active')) {
            dropdownsArray[index].style.maxHeight = '0px'
            } else {
            dropdownsArray[index].style.maxHeight = dropdownsArray[index].scrollHeight + 'px'  
            }
            item.classList.toggle('active')
        })
    })
}

// Google Play and Appstore Images
import {base64GooglePlay} from './googleplay.js'
import { base64AppStore } from './appstore.js'

document.addEventListener('DOMContentLoaded', () => {
    const googlePlayImage = document.querySelector('.google-play')
    const appStoreImage = document.querySelector('.appstore')
    googlePlayImage.src = base64GooglePlay
    appStoreImage.src = base64AppStore
})

// slider padding for 1300> screens
const sliders = document.querySelectorAll('.slider')
const sectionHeading = document.querySelector('.section-heading')

function setSliderPadding() {
    sliders.forEach(slider => {
        if(window.innerWidth < 1440) {
        slider.style.paddingLeft = `${sectionHeading.offsetLeft + 'px'}` 
        slider.style.paddingRight = `${sectionHeading.offsetLeft + 'px'}` 
        } else {
        slider.style.paddingLeft = '0'
        slider.style.paddingRight = '0' 
        }
    })
}

document.addEventListener('DOMContentLoaded', setSliderPadding)
window.addEventListener('resize', setSliderPadding)


//Bottom Buton menu 
//dynamically toggling transition delay for open and close icons 
const buttonMenu = document.querySelector('.button-menu')
const closeBtn = document.querySelector('.close-bottom-menu')
const openBtn = document.querySelector('.open-bottom-menu')
const bottomBtns = document.querySelector('.buttons')

buttonMenu.addEventListener('click', () => {
    if (buttonMenu.classList.contains('active')) {
        openBtn.style.transitionDelay = '0.5s';
        closeBtn.style.transitionDelay = '0s';
        buttonMenu.classList.toggle('active');
        bottomBtns.classList.toggle('active');
        setTimeout(() => {
            openBtn.style.transitionDelay = '0s';
            closeBtn.style.transitionDelay = '0.5s';
        }, 0); // Set delay to ensure the above toggle effect is applied
    } else {
        openBtn.style.transitionDelay = '0s';
        closeBtn.style.transitionDelay = '0.5s';
        buttonMenu.classList.toggle('active');
        bottomBtns.classList.toggle('active');
        setTimeout(() => {
            openBtn.style.transitionDelay = '0.5s';
            closeBtn.style.transitionDelay = '0s';
        }, 0); // Set delay to ensure the above toggle effect is applied
    }
});
    


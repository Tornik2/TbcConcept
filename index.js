const header = document.getElementById('header-container')
const menuToggleIcon = document.getElementById('menuToggle')
const navigation = document.querySelector('.navigation')
const dropdowns = document.querySelectorAll('.dropdown-list')
const navItems = document.querySelectorAll('.nav-list-item')

//for footer dropdows 
const footerItems = document.querySelectorAll('.footer-list-item')
const footerDropdowns = document.querySelectorAll('.footer-dropdown-list')
console.log(footerDropdowns,footerItems)

const dropdownArrows = document.querySelectorAll('.mobile-dropdown-arrow')

menuToggleIcon.addEventListener('click', function() {
    this.classList.toggle('active');
    navigation.classList.toggle('active')
    if(menuToggleIcon.classList.contains('active')) {
        header.style.backgroundColor =  "#f9fafa"
    } else {
        header.style.backgroundColor =  "#fff"
    }
});


console.log(navItems, dropdowns, footerItems, footerDropdowns)
toggleDropdowns(navItems, dropdowns)
toggleDropdowns(footerItems, footerDropdowns)

function toggleDropdowns(elArray, dropdownsArray) {
    elArray.forEach((item, index) => {
        item.addEventListener('click', () => {
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
const slider = document.querySelector('.slider')
const sectionHeading = document.querySelector('.section-heading')
document.addEventListener('DOMContentLoaded', ()=> {
    
    if(window.innerWidth < 1440) {
    slider.style.padding = `0 ${sectionHeading.offsetLeft + 'px'}` 
    }
})
console.log(sectionHeading.offsetLeft)
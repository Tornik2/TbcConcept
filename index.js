const menuToggleIcon = document.getElementById('menuToggle')
const header = document.getElementById('header-wrapper')
const navigation = document.querySelector('.navigation')
const navItems = document.querySelectorAll('.nav-item-content')
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


navItems.forEach((item, idx) => {
    
    item.addEventListener('click', ()=> {
         navItems.forEach( (otherItem, idx) => {
            if(otherItem !== item) {
                otherItem.classList.remove('active')
                dropdownArrows[idx].classList.remove('opened')
            }
         })
         item.classList.toggle('active')
         dropdownArrows[idx].classList.add('opened')
            
            
        })

        
    
})

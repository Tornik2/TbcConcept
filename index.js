const menuToggleIcon = document.getElementById('menuToggle')
const header = document.getElementById('header-wrapper')
const navigation = document.querySelector('.navigation')
const navItems = document.querySelectorAll('.nav-item')

menuToggleIcon.addEventListener('click', function() {
    this.classList.toggle('active');
    navigation.classList.toggle('active')
    if(menuToggleIcon.classList.contains('active')) {
        header.style.backgroundColor =  "#f9fafa"
    } else {
        header.style.backgroundColor =  "#fff"
    }
});


navItems.forEach((item) => {
    
    item.addEventListener('click', ()=> {
         navItems.forEach( otherItem => {
            if(otherItem !== item) {
                otherItem.classList.remove('active')
            }
         })
         item.classList.toggle('active')
            
            
            
        })

        
    
})

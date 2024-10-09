let menu=document.querySelector('#menu-icon');
let links=document.querySelector('.links');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    links.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    links.classList.remove('active');
}




// Typing text

const typed= new Typed('.typing-text',{
    strings:['a data engineer','specialized in Python','graduated in 2024'],
    typeSpeed: 50,
    backSpeed: 90,
    loop: true,
})
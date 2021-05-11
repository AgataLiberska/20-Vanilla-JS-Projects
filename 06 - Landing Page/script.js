const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

//toggle nav
toggle.addEventListener('click', () => {
    document.body.classList.toggle('show-nav');
});

// show modal
open.addEventListener('click', () => {
    modal.classList.add('show-modal');
});
// hide modal
close.addEventListener('click', () => {
    modal.classList.remove('show-modal');
});

//hide modal on click outside modal
window.addEventListener('click', e => {
    console.log(e);
    e.target === modal ? modal.classList.remove('show-modal') : false;
})
const nav = document.getElementById('main');
const navLinks = document.getElementById('nav-links');
const markup =
  `<ul>
${navItems.map(listItem => `<li><a href="${listItem.link}">${listItem.label}</a></li>`).join('')}
</ul>`;
navLinks.innerHTML = markup;



let topOfNav = nav.offsetTop;
function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}
window.addEventListener('scroll', fixNav);



const siteWrap = document.querySelector('.site-wrap');
window.onload = function () {
  window.location.hash = '#watchlist'
}

window.onhashchange = function () {
  let newloc = window.location.hash;
  let newContent = navItems.filter(navItem => navItem.link == newloc);
  siteWrap.innerHTML = `
  <h1>${newContent[0].label}</h1>
  <h2>${newContent[0].header}</h2>
  <p>${newContent[0].content}</p>
  `;
}














const pages = {
  home: `<h1>Welcome to My Portfolio</h1>`,
  about: `<h1>About Me</h1><p>Short bio...</p>`,
  projects: `<h1>Projects</h1><ul><li>Project 1</li></ul>`,
  contact: `<h1>Contact</h1><form>...</form>`
};

function loadPage(page) {
  document.getElementById('content').innerHTML = pages[page] || pages.home;
}

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    loadPage(page);
    history.pushState({page}, '', `#${page}`);
  });
});

window.addEventListener('popstate', e => {
  const page = (e.state && e.state.page) || 'home';
  loadPage(page);
});

// Initial load
const initialPage = location.hash.replace('#', '') || 'home';
loadPage(initialPage);
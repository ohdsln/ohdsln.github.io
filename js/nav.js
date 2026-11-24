
const nav = document.getElementById('main-nav');
const navItems = document.querySelectorAll('.nav-item');

let activeItem = null;
let pinnedItem = null;

function closeMenus() {
  navItems.forEach(item => {
    item.classList.remove('is-open');

    const button = item.querySelector('.nav-trigger');

    if (button && button.tagName === 'BUTTON') {
      button.setAttribute('aria-expanded', 'false');
    }
  });

  activeItem = null;
  pinnedItem = null;
}

function openMenu(item) {
  navItems.forEach(menu => {
    menu.classList.remove('is-open');

    const button = menu.querySelector('.nav-trigger');

    if (button && button.tagName === 'BUTTON') {
      button.setAttribute('aria-expanded', 'false');
    }
  });

  if (activeItem === item && !pinnedItem) {
    activeItem = null;
    return;
  }

  item.classList.add('is-open');

  const button = item.querySelector('.nav-trigger');

  if (button && button.tagName === 'BUTTON') {
    button.setAttribute('aria-expanded', 'true');
  }

  activeItem = item;
}

/* Open dropdowns when hovering over their menu titles */
navItems.forEach(item => {
  const button = item.querySelector('button.nav-trigger');

  if (button) {
    item.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) {
        pinnedItem = null;
        openMenu(item);
      }
    });

    button.addEventListener('click', (event) => {
      event.stopPropagation();

      if (pinnedItem === item) {
        closeMenus();
      } else {
        pinnedItem = item;
        openMenu(item);
      }
    });
  }
});

/* Close the active dropdown when the pointer moves over another menu title */
nav.addEventListener('pointermove', (event) => {
  if (!activeItem || pinnedItem) {
    return;
  }

  const pointerOnAnotherItem = Array.from(navItems).some(item => {
    if (item === activeItem) {
      return false;
    }

    const rect = item.getBoundingClientRect();

    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  });

  if (pointerOnAnotherItem) {
    closeMenus();
  }
});

/* Close dropdowns when leaving the entire navigation area */
nav.addEventListener('mouseleave', () => {
  if (pinnedItem) {
    return;
  }

  closeMenus();
});

/* Close dropdowns when clicking outside the navigation */
document.addEventListener('click', (event) => {
  if (!nav.contains(event.target)) {
    closeMenus();
  }
});


class StickyNavigation {
    constructor() {
      this.currentId = null;
      this.currentTab = null;
      this.tabContainerHeight = 70;
      this.lastScroll = 0;
  
      // Using arrow function to preserve the value of 'this'
      document.querySelectorAll('.hero-tab').forEach(tab => {
        tab.addEventListener('click', (event) => this.onTabClick(event, tab));
      });
  
      window.addEventListener('scroll', () => this.onScroll());
      window.addEventListener('resize', () => this.onResize());
    }
  
    onTabClick(event, element) {
      event.preventDefault();
      const targetId = element.getAttribute('href');
      const scrollTop = document.querySelector(targetId).offsetTop - this.tabContainerHeight + 1;
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }
  
    onScroll() {
      this.checkHeaderPosition();
      this.findCurrentTabSelector();
      this.lastScroll = window.scrollY;
    }
  
    onResize() {
      if (this.currentId) {
        this.setSliderCss();
      }
    }
  
    checkHeaderPosition() {
      const headerHeight = 75;
  
      const tabsContainer = document.querySelector('.hero-tabs');
      let offset =
        tabsContainer.offsetTop + tabsContainer.offsetHeight - this.tabContainerHeight - headerHeight;
  
      if (window.scrollY > this.lastScroll && window.scrollY > offset) {
        document.querySelector('.header').classList.add('header--move-up');
        document.querySelector('.hero-tabs-container').classList.remove('hero-tabs-container--top-first');
        document.querySelector('.hero-tabs-container').classList.add('hero-tabs-container--top-second');
      } else if (window.scrollY < this.lastScroll && window.scrollY > offset) {
        document.querySelector('.header').classList.remove('header--move-up');
        document.querySelector('.hero-tabs-container').classList.remove('hero-tabs-container--top-second');
        document.querySelector('.hero-tabs-container').classList.add('hero-tabs-container--top-first');
      } else {
        document.querySelector('.header').classList.remove('et-header--move-up');
        document.querySelector('.hero-tabs-container').classList.remove('hero-tabs-container--top-first');
        document.querySelector('.hero-tabs-container').classList.remove('hero-tabs-container--top-second');
      }
    }
  
    findCurrentTabSelector() {
      let newCurrentId;
      let newCurrentTab;
  
      document.querySelectorAll('.hero-tab').forEach(tab => {
        const id = tab.getAttribute('href');
        const offsetTop = document.querySelector(id).offsetTop - this.tabContainerHeight;
        const offsetBottom = document.querySelector(id).offsetTop + document.querySelector(id).offsetHeight - this.tabContainerHeight;
  
        if (window.scrollY > offsetTop && window.scrollY < offsetBottom) {
          newCurrentId = id;
          newCurrentTab = tab;
        }
      });
  
      if (this.currentId !== newCurrentId || this.currentId === null) {
        this.currentId = newCurrentId;
        this.currentTab = newCurrentTab;
        this.setSliderCss();
      }
    }
  
    setSliderCss() {
      let width = 0;
      let left = 0;
  
      if (this.currentTab) {
        width = window.getComputedStyle(this.currentTab).getPropertyValue('width');
        left = this.currentTab.offsetLeft;
      }
  
      document.querySelector('.hero-tab-slider').style.width = width;
      document.querySelector('.hero-tab-slider').style.left = left + 'px';
    }
  }
  
  new StickyNavigation();

  function smoothScroll(target) {
    const targetElement = document.querySelector(target);
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  }





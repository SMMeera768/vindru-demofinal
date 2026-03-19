// PRODUCTS PAGE INTERACTIONS

// Hash map: tab-* hashes → { category, tab }
const TAB_HASH_MAP = {
  'tab-hammers':         { category: 'drilling-tools', tab: 'hammers' },
  'tab-drill-bits':      { category: 'drilling-tools', tab: 'drill-bits' },
  'tab-drill-rods':      { category: 'drilling-tools', tab: 'drill-rods' },
  'tab-accessories':     { category: 'drilling-tools', tab: 'accessories' },
  'tab-fishing-tools':   { category: 'drilling-tools', tab: 'fishing-tools' },
  'tab-drilling-fluids': { category: 'drilling-tools', tab: 'drilling-fluids' },
  'tab-compressors':     { category: 'components',     tab: 'compressors' },
  'tab-water-pumps':     { category: 'components',     tab: 'water-pumps' },
  'tab-boosters-engines':{ category: 'components',     tab: 'boosters-engines' },
  'tab-genuine-spares':  { category: 'components',     tab: 'genuine-spares' },
};

function activateSection(categoryId) {
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const categorySections = document.querySelectorAll('.category-section');

  sidebarItems.forEach(i => {
    i.classList.toggle('active', i.dataset.category === categoryId);
  });
  categorySections.forEach(section => {
    section.classList.toggle('active', section.id === categoryId);
    if (section.id === categoryId) {
      const overview = section.querySelector('.category-overview');
      if (overview) overview.classList.remove('hidden');
      section.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      section.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    }
  });
}

function activateTab(categoryId, tabId) {
  activateSection(categoryId);
  const section = document.getElementById(categoryId);
  if (!section) return;

  const overview = section.querySelector('.category-overview');
  if (overview) overview.classList.add('hidden');

  section.querySelectorAll('.tab-content').forEach(t => {
    t.classList.toggle('active', t.id === tabId);
  });
  section.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabId);
  });
}

function handleHash() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;

  if (TAB_HASH_MAP[hash]) {
    const { category, tab } = TAB_HASH_MAP[hash];
    activateTab(category, tab);
  } else {
    // Direct section hash (drilling-rigs, drilling-tools, components, used-equipment)
    const section = document.getElementById(hash);
    if (section && section.classList.contains('category-section')) {
      activateSection(hash);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  
  // SIDEBAR NAVIGATION
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const categorySections = document.querySelectorAll('.category-section');
  
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      categorySections.forEach(section => {
        section.classList.remove('active');
        if (section.id === category) {
          section.classList.add('active');
          
          const overview = section.querySelector('.category-overview');
          const tabs = section.querySelectorAll('.tab-content');
          const tabButtons = section.querySelectorAll('.tab-btn');
          
          if (overview) overview.classList.remove('hidden');
          tabs.forEach(tab => tab.classList.remove('active'));
          tabButtons.forEach(btn => btn.classList.remove('active'));
        }
      });
    });
  });
  
  // HORIZONTAL TABS
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tab;
      const parentSection = button.closest('.category-section');
      
      const overview = parentSection.querySelector('.category-overview');
      if (overview) overview.classList.add('hidden');
      
      parentSection.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      parentSection.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) content.classList.add('active');
      });
    });
  });

  // Handle deep-link hash on page load
  handleHash();
});

// TABLE EXPAND/COLLAPSE FUNCTION
function toggleTableRows(button) {
  const table = button.closest('.products-table');
  const expandableRows = table.querySelectorAll('.expandable-row');
  const isExpanded = expandableRows[0].classList.contains('show');
  
  if (isExpanded) {
    // Collapse
    expandableRows.forEach(row => row.classList.remove('show'));
    button.textContent = 'Show More';
  } else {
    // Expand
    expandableRows.forEach(row => row.classList.add('show'));
    button.textContent = 'Show Less';
  }
}

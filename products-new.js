// PRODUCTS PAGE INTERACTIONS

document.addEventListener('DOMContentLoaded', () => {
  
  // SIDEBAR NAVIGATION
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const categorySections = document.querySelectorAll('.category-section');
  
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      
      // Update sidebar active state
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      // Show corresponding category section
      categorySections.forEach(section => {
        section.classList.remove('active');
        if (section.id === category) {
          section.classList.add('active');
          
          // Show category overview, hide all tab content
          const overview = section.querySelector('.category-overview');
          const tabs = section.querySelectorAll('.tab-content');
          const tabButtons = section.querySelectorAll('.tab-btn');
          
          if (overview) {
            overview.classList.remove('hidden');
          }
          
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
      
      // Hide category overview when clicking any tab
      const overview = parentSection.querySelector('.category-overview');
      if (overview) {
        overview.classList.add('hidden');
      }
      
      // Update tab buttons
      parentSection.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
      
      // Update tab content
      parentSection.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
          content.classList.add('active');
        }
      });
    });
  });
  
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

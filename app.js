
const DATA = window.ALETHIA_MENU;
let current = 0;
let lang = 'ar';
let activeGroup = null;

const GROUPS = {
  food: ['breakfast','salads','appetizers','burgers','main-dishes','alethia-meals','italian'],
  drinks: ['hot-drinks','cold-drinks','juices','milkshake','mojito','iced-tea','frappuccino','drinks'],
  shisha: ['shisha']
};

function visibleCategories(){
  if(!activeGroup) return DATA.categories.map((c,i)=>({c,i}));
  const allowed = GROUPS[activeGroup] || [];
  return DATA.categories.map((c,i)=>({c,i})).filter(x=>allowed.includes(x.c.id));
}


const sidebar = document.getElementById('sidebar');
const mobileCats = document.getElementById('mobileCats');
const items = document.getElementById('items');
const hero = document.getElementById('hero');
const search = document.getElementById('search');
const homeScreen = document.getElementById('homeScreen');
const menuScreen = document.getElementById('menuScreen');

function money(n){ return new Intl.NumberFormat('en-US').format(n) + ' ' + DATA.settings.currency; }

function renderNav(){
  const visible = visibleCategories();
  sidebar.innerHTML =
    `<div class="side-title">ALETHIA MENU</div>` +
    visible.map(({c,i})=>`
      <button class="side-btn ${i===current?'active':''}" onclick="openCategory(${i})">
        ${lang==='ar'?c.name_ar:c.name_en}
      </button>`).join('');

  mobileCats.innerHTML = visible.map(({c,i})=>`
    <button class="cat-chip ${i===current?'active':''}" onclick="openCategory(${i})">
      ${lang==='ar'?c.name_ar:c.name_en}
    </button>`).join('');
}

function renderCategory(query=''){
  const c = DATA.categories[current];
  document.getElementById('tagline').textContent = lang==='ar' ? DATA.settings.tagline_ar : DATA.settings.tagline_en;
  document.getElementById('heroTitleAr').textContent = c.name_ar;
  document.getElementById('heroTitleEn').textContent = c.name_en.toUpperCase();
  document.getElementById('menuTitle').textContent = lang==='ar' ? 'المنيو' : 'MENU';
  const heroImage =
    c.id === 'salads' ? 'assets/images/salads-hero.webp' :
    c.id === 'appetizers' ? 'assets/images/appetizers-hero.webp' :
    c.id === 'burgers' ? 'assets/images/burgers-hero.webp' :
    ['main-dishes','main_dishes','dishes','diet'].includes(c.id) ? 'assets/images/main-dishes-hero.webp' :
    c.hero_image;
  hero.style.backgroundImage = `url("${heroImage}")`;
  hero.classList.toggle('breakfast-hero', c.id === 'breakfast');

  const q = query.trim().toLowerCase();
  const filtered = c.items.filter(item => (item.name_ar+' '+item.name_en).toLowerCase().includes(q));

  items.innerHTML = filtered.map(item=>`
    <article class="card" onclick="openItemModal('${item.id}')">
      <div class="card-img" style="background-image:url('${item.image}')"></div>
      <div class="card-body">
        <h3>${item.name_ar}</h3>
        <div class="en">${item.name_en}</div>
        ${item.description_ar?`<div class="desc">${item.description_ar}</div>`:''}
        <div class="price">${money(item.price)}</div>
      </div>
    </article>`).join('');
}

function showHome(){
  activeGroup = null;
  homeScreen.classList.remove('hidden');
  menuScreen.classList.add('hidden');
  window.scrollTo({top:0,behavior:'smooth'});
}


function openGroup(group){
  activeGroup = group;
  const ids = GROUPS[group] || [];
  const firstIndex = DATA.categories.findIndex(c=>ids.includes(c.id));
  if(firstIndex >= 0) current = firstIndex;
  search.value = '';
  openMenu();
  renderNav();
  renderCategory();
}

function openMenu(){
  homeScreen.classList.add('hidden');
  menuScreen.classList.remove('hidden');
  renderNav(); renderCategory();
  window.scrollTo({top:0,behavior:'smooth'});
}

function openCategory(i){
  current=i;
  search.value='';
  openMenu();
  renderNav();
  renderCategory();
}

function openCategoryById(id){
  const i = DATA.categories.findIndex(c=>c.id===id);
  if(i>=0) openCategory(i);
}

function focusSearch(){
  openMenu();
  setTimeout(()=>search.focus(),100);
}
function focusMenu(){ openMenu(); }
function showInfo(){ alert('ALETHIA Digital Showcase Menu'); }

document.getElementById('langBtn').onclick=()=>{
  lang = lang==='ar' ? 'en' : 'ar';
  document.documentElement.dir = lang==='ar' ? 'rtl' : 'ltr';
  search.placeholder = lang==='ar' ? 'ابحث عن آيتم...' : 'Search for an item...';
  renderNav(); renderCategory(search.value);
};


function findItemById(id){
  for(const category of DATA.categories){
    const item = category.items.find(x=>x.id===id);
    if(item) return item;
  }
  return null;
}

function openItemModal(id){
  const item = findItemById(id);
  if(!item) return;

  document.getElementById('modalImage').style.backgroundImage = `url("${item.image}")`;
  document.getElementById('modalNameAr').textContent = item.name_ar || '';
  document.getElementById('modalNameEn').textContent = item.name_en || '';
  document.getElementById('modalDescription').textContent =
    item.description_ar || item.description_en || '';
  document.getElementById('modalPrice').textContent = money(item.price);

  document.getElementById('itemModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeItemModal(event){
  if(event && event.target && event.target.id !== 'itemModal') return;
  document.getElementById('itemModal').classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e=>{
  if(e.key === 'Escape') closeItemModal();
});

search.addEventListener('input',e=>renderCategory(e.target.value));
renderNav(); renderCategory(); showHome();

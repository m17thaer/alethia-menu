(() => {
  const menu = window.ALETHIA_MENU;
  if (!menu || !Array.isArray(menu.categories)) return;
  for (const cat of menu.categories) {
    if (!Array.isArray(cat.items)) continue;
    for (const i of cat.items) {
      if (i.id === "chicken-fakhara") i.price = 20000;
      if (i.id === "english-shisha") i.price = 12000;
    }
  }
})();

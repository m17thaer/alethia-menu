(() => {
  const menu = window.ALETHIA_MENU;
  if (!menu || !Array.isArray(menu.categories)) return;

  const category = (id) => menu.categories.find(c => c.id === id);
  const item = (cat, id) => cat && Array.isArray(cat.items) ? cat.items.find(i => i.id === id) : null;

  const shisha = category("shisha");
  if (shisha) {
    const gumMint = item(shisha, "alak-mint");
    if (gumMint) gumMint.name_ar = "علك ونعناع";

    const gum = item(shisha, "alak");
    if (gum) gum.name_ar = "علك";

    const etherLove = item(shisha, "akthar-love");
    if (etherLove) etherLove.name_ar = "ايثر لوف";
  }
})();

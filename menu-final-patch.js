(() => {
  const menu = window.ALETHIA_MENU;
  if (!menu || !Array.isArray(menu.categories)) return;

  const category = (id) => menu.categories.find(c => c.id === id);
  const item = (cat, id) => cat && Array.isArray(cat.items) ? cat.items.find(i => i.id === id) : null;

  // ICED TEA
  const icedTea = category("iced-tea");
  if (icedTea) {
    icedTea.hero_image = "assets/images/iced-tea-general.webp";
    icedTea.items = (icedTea.items || []).filter(i => i.id !== "hibiscus-iced-tea");

    const lemon = item(icedTea, "lemon-iced-tea");
    if (lemon) {
      lemon.image = "assets/images/lemon-iced-tea.webp";
      lemon.description_ar = "آيس تي بارد ومنعش مع نكهة الليمون الطازج، يُقدّم مع الثلج.";
      lemon.description_en = "Refreshing chilled iced tea with fresh lemon, served over ice.";
    }

    const peach = item(icedTea, "peach-iced-tea");
    if (peach) {
      peach.image = "assets/images/peach-iced-tea.webp";
      peach.description_ar = "آيس تي بارد بنكهة الخوخ الحلوة والمنعشة، يُقدّم مع الثلج.";
      peach.description_en = "Refreshing iced tea with naturally sweet peach flavour, served over ice.";
    }

    const karkade = item(icedTea, "karkade-iced-tea");
    if (karkade) {
      karkade.image = "assets/images/karkade-iced-tea.webp";
      karkade.description_ar = "آيس تي كركديه منعش بطابع زهري متوازن، يُقدّم بارداً مع الثلج.";
      karkade.description_en = "Refreshing hibiscus iced tea with a balanced floral character, served over ice.";
    }
  }

  // FRAPPUCCINO
  const frappe = category("frappuccino");
  if (frappe) {
    frappe.hero_image = "assets/images/frappuccino-hero.webp";

    const mocha = item(frappe, "mocha-frap");
    if (mocha) {
      mocha.name_en = "Mocha Frappuccino";
      mocha.image = "assets/images/mocha-frap.webp";
    }

    const pistachio = item(frappe, "pistachio-frap");
    if (pistachio) {
      pistachio.name_en = "Pistachio Frappuccino";
      pistachio.image = "assets/images/pistachio-frap.webp";
    }

    const caramel = item(frappe, "caramel-frap");
    if (caramel) {
      caramel.name_en = "Caramel Cappuccino Frappe";
      caramel.image = "assets/images/caramel-frap.webp";
    }
  }

  // DRINKS
  const drinks = category("drinks");
  if (drinks) {
    drinks.hero_image = "assets/images/drinks-hero.webp";

    const water = item(drinks, "water");
    if (water) water.image = "assets/images/water.webp";

    const pepsi = item(drinks, "pepsi-seven");
    if (pepsi) pepsi.image = "assets/images/pepsi-seven.webp";

    const redbull = item(drinks, "redbull");
    if (redbull) redbull.image = "assets/images/redbull.webp";

    // Use the existing fourth drink slot for Tiger, keeping its original price.
    const tiger = item(drinks, "tiger") || item(drinks, "mexican");
    if (tiger) {
      tiger.id = "tiger";
      tiger.name_ar = "تايكر";
      tiger.name_en = "Tiger";
      tiger.image = "assets/images/tiger.webp";
      tiger.description_ar = "مشروب طاقة بارد ومنعش.";
      tiger.description_en = "A crisp and refreshing energy drink, served ice cold.";
    }
  }

  // SHISHA
  const shisha = category("shisha");
  if (shisha) {
    shisha.hero_image = "assets/images/shisha-hero.webp";
    (shisha.items || []).forEach(i => {
      i.image = "assets/images/shisha-hero.webp";
    });
  }
})();

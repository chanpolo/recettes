  const date = new Date();
  const month = date.getUTCMonth()+1;
  const day = date.getUTCDate();
  
  const year = date.getUTCFullYear();
  const number = day + month + year;

  async function getEntrees() {
    let url = "json/entree.json"
    let res = await fetch(url);
    return await res.json();
  }  

  async function getPlats() {
    let url = "json/plat.json"
    let res = await fetch(url);
    return await res.json();
  } 
  async function getDesserts() {
    let url = "json/dessert.json"
    let res = await fetch(url);
    return await res.json();
  }

  async function renderSuggestions() {
    const entrees = await getEntrees();
    const plats = await getPlats();
    const desserts = await getDesserts();
   
    const index_entree = number % entrees.length; 
    const index_plat = number % plats.length
    const index_dessert = number % desserts.length;

    const index_entree2 = (index_entree + Math.floor(index_entree / 2) + 1) % entrees.length;
    const index_plat2 = (index_plat + Math.floor(index_plat / 2) + 1) % plats.length;

    const entree = entrees[index_entree];
    const entree2 = entrees[index_entree2];
    const plat = plats[index_plat];
    const plat2 = plats[index_plat2];
    const dessert = desserts[index_dessert];



    const suggestions = [entree, entree2, plat, plat2, dessert]

    let html = '';

      suggestions.forEach(suggestion => {
        let htmlSegment = `
                          <li class="hidden lg:inline-grid grid grid-cols-6  gap-x-4 pt-1">
                          <a class="col-span-1" href="${suggestion.url}">
                            <img src="${suggestion.image}" alt="${suggestion.alt}">
                          </a>
                          <a class="col-span-2 capitalize md:tracking-wide no-underline" href="${suggestion.url}">
                          <span class="font-normal md:font-semibold md:text-xl md:pt-1">${suggestion.Title}</span>
                          <br><span class="md:text-lg">${suggestion.date}</span>
                          <br><span class="md:text-lg">${suggestion.author}</span>
                          </a>
                          <span class="col-span-3 tracking-tighter md:tracking-wide lg:tracking-widest md:text-lg">${suggestion.description}</span>
                          </li>
                          <li class="lg:hidden grid grid-cols-6  gap-2 text-xs pt-1">
                          <a class="col-span-1" href="${suggestion.url}">
                            <img src="${suggestion.image}" alt="${suggestion.alt}">
                          </a>
                          <a class="col-span-2 capitalize no-underline" href="${suggestion.url}">
                          <span class="">${suggestion.titleshort}</span>
                          <br><span class="">${suggestion.date}</span>
                          <br><span class="">${suggestion.author}</span>
                          </a>
                          <span class="col-span-3 ">${suggestion.short}</span>
                          </li>
                          `;
        html += htmlSegment;
      });
      document.getElementById("suggestions").innerHTML = html;
    }

  
  //renderSuggestions()

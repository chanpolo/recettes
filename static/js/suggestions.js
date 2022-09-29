      // create a number changing every day
      const date = new Date();
      const month = date.getUTCMonth()+1;
      const day = date.getUTCDate();      
      const year = date.getUTCFullYear();
      const number = 3*day + month + year;

      // create async function to call json files
      async function getSuggestions(url) {
        let response = await fetch(url);
        let text = await response.text();
        let split = await text.split('<script')[0];
        let replace = await split.replace(/(\r\n|\n|\r)/gm,"");
        let json = await JSON.parse(replace);
        console.log(json)
        return await json;
      }

      // create async function to render HTML
      async function renderSuggestions() {
        const entrees = await getSuggestions("json/json-entree");
        const plats = await getSuggestions("json/json-plat");
        const desserts = await getSuggestions("json/json-dessert");

        // create index from number in each json, 2 for entree, 2 for plat, 1 for dessert according to number

        const index_entree = number % entrees.length; 
        const index_plat = number % plats.length;
        const index_dessert = number % desserts.length;
        const index_entree2 = (index_entree + Math.floor(index_entree / 2) + 1) % entrees.length;
        const index_plat2 = (index_plat + Math.floor(index_plat / 2) + 1) % plats.length;
    
        // get the 5 suggestions : 2 entree, 2 plat, 1 dessert
        const entree = entrees[index_entree];
        const entree2 = entrees[index_entree2];
        const plat = plats[index_plat];
        const plat2 = plats[index_plat2];
        const dessert = desserts[index_dessert];

        // create array with the suggestions
        const suggestions = [entree, entree2, plat, plat2, dessert];

        // create the html to display the suggestions and render ById
        let html = '';

          suggestions.forEach(suggestion => {
            let htmlSegment = `
                              <li class="hidden lg:inline-grid grid grid-cols-6  gap-x-4 pt-1">
                              <a class="col-span-1" href="${suggestion.url}">
                                <img src="${suggestion.image}" alt="${suggestion.alt}">
                              </a>
                              <a class="col-span-2 capitalize md:tracking-wide no-underline" href="${suggestion.url}">
                              <span class="font-normal md:font-semibold md:text-xl md:pt-1">${suggestion.Title}</span>
                              <br><span class="md:text-lg capitalize">${suggestion.categorie}</span>
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
                              <br><span class="capitalize">${suggestion.categorie}</span>
                              <br><span class="">${suggestion.author}</span>
                              </a>
                              <span class="col-span-3 ">${suggestion.short}</span>
                              </li>
                              `;
            html += htmlSegment;
          });
        document.getElementById("suggestions").innerHTML = html;
      }

      // launch script
      renderSuggestions()
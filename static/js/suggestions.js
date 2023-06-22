      // create a number changing every day
      const date = new Date();
      const month = date.getUTCMonth()+1;
      const day = date.getUTCDate();      
      const year = date.getUTCFullYear();
      const number = 3*day + month + year;

      // create async function to call json files
      async function getSuggestions(url) {
        let response = await fetch(url);
        return await response.json();
      }

      // create async function to render HTML
      async function renderSuggestions() {
        const entrees = await getSuggestions("json/entree.json");
        const plats = await getSuggestions("json/plat.json");
        const desserts = await getSuggestions("json/dessert.json");

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
            let htmlSegment = 
            ` <a href="${suggestion.url}" class="no-underline">
            <div class="lg:hidden grid grid-cols-6 gap-2 text-sm pt-1">
           
              <div class="col-span-1">
                <img src="${suggestion.image}" alt="${suggestion.alt}">
              </div>
              <div class="col-span-2 capitalize no-underline" >
                <span>${suggestion.titleshort}</span><br>
                <span>${suggestion.author}</span>
              </div>
             
              <div class=" col-span-3 ">
                ${suggestion.short}
              </div>
            </div>
            </a>

            <a href="${suggestion.url}" class="no-underline">
            <div class="hidden lg:inline-grid grid-cols-6 gap-x-4  text-lg pt-1">
           
              <div class="col-span-1">
                <img src="${suggestion.image}" alt="${suggestion.alt}">
              </div>
              <div class="col-span-2 capitalize no-underline" >
                <span class="font-semibold text-lg pt-1 hover:underline">${suggestion.Title}</span><br>
                <span>${suggestion.categorie}</span><br>
                <span>${suggestion.author}</span>
              </div>
              
              <div class=" col-span-3 tracking-wide text-lg">
                ${suggestion.description}
              </div>
            </div>
            </a>
         `;
            html += htmlSegment;
          });
        document.getElementById("suggestions").innerHTML = html;
      }

      // launch script
      renderSuggestions()
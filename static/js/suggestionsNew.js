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
    const genimages = await getSuggestions("json/genimages.json"); 

    const index_entree = number % entrees.length; 
    const index_plat = number % plats.length;
    const index_dessert = number % desserts.length;
    const index_entree2 = (index_entree + Math.floor(index_entree / 2) + 1) % entrees.length;
    const index_plat2 = (index_plat + Math.floor(index_plat / 2) + 5) % plats.length;

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
    // get the path to _gen images
    let path = "https://chanpolo.netlify.app/images/"

    // loops to create htmlSegment to ad to html
    const imagesResized = [];
    for (let suggestion of suggestions) {
        const imagesResizedPart = []
        suggName = suggestion.image.split("/")[2].split(".")[0];  //pour avoir le nom de l'image sans le chemin ni l'extension
        
        // create array of images for this selection
        for (let genimage of genimages) {
            const suggNameUnder = suggName + "_";
                if (genimage.nom.startsWith(suggNameUnder)) {
                // if (1 == 2) {
                    // console.log("suggName et genimage : ", suggNameUnder, genimage.nom);
                    imagesResizedPart.push(genimage.nom);
                }
        }
        // selectionne les Images et les classes par type et taille ; elimine les doublons
        const imagesResizedOrder = [];
        let webp = imagesResizedPart.find(function (element) {
            return element.endsWith(".webp")
        });
        let S320 = imagesResizedPart.find(function (element) {
            return element.includes("_320x0_")
        });
        let S640 = imagesResizedPart.find(function (element) {
            return element.includes("_640x0_")
        });
        let S768 = imagesResizedPart.find(function (element) {
            return element.includes("_768x0_")
        });
        let S1024 = imagesResizedPart.find(function (element) {
            return element.includes("_1024x0_")
        });
        let S1280 = imagesResizedPart.find(function (element) {
            return element.includes("_1280x0_")
        });
        let S1536 = imagesResizedPart.find(function (element) {
            return element.includes("_1536x0_")
        });

        // variables images avec leur path

        let imgWebp = path + webp;
        let img320= path + S320;
        let img640 = path + S640;
        let img768 = path + S768;
        let img1024 = path + S1024;
        let img1280 = path + S1280;
        let img1536 = path + S1536;
        
        let htmlSegment = 
        `
        <div class="lg:hidden   text-sm pt-1">
            <div class="grid grid-cols-2 gap-2">
                <a href="${suggestion.url}" class="no-underline">
                    <div class="grid grid-cols-3 gap-1">
                        <div class="col-span-1 inline-block" >
                            <figure>
                                <picture>
                                    <source srcset="${imgWebp}">
                                    <source srcset='
                                        ${img320} 320w,
                                        ${img640} 640w,'
                                    >
                                    <img class="" src="${suggestion.image}" alt="${suggestion.alt}">
                                </picture>
                            </figure> 
                        </div>
                        <div class="col-span-2 capitalize no-underline" >
                            <span>${suggestion.titleshort}</span><br>
                            <span>${suggestion.author}</span>
                        </div>
                    </div>
                </a>
                <div class=" ">
                    ${suggestion.short}
                </div>
            </div>
        </div>

     
        <div class="hidden lg:block text-lg pt-2">
            <div class="grid grid-cols-2 gap-x-4">
                <a href="${suggestion.url}" class="no-underline">
                    <div class="grid grid-cols-3 gap-x-4">
                        <div class="col-span-1 inline-block" >
                            <figure>
                                <picture>
                                    <source srcset="${imgWebp}">
                                    <source srcset='
                                        ${img320} 320w,
                                        ${img640} 640w,
                                        ${img768} 768w,
                                        ${img1024} 1024w,
                                        ${img1280} 1280w,
                                        ${img1536} 1536w,'
                                    >
                                    <img class="" src="${suggestion.image}" alt="${suggestion.alt}">
                                </picture>
                            </figure> 
                        </div>
                        <div class="col-span-2 tracking-wide capitalize no-underline" >
                            <span class="font-semibold hover:underline">${suggestion.Title}</span><br>
                            <span>${suggestion.author}</span>
                        </div>
                    </div>
                </a>
                <div class=" ">
                    ${suggestion.description}
                </div>
            </div>
        </div>
        `;
        html += htmlSegment
      };
      document.getElementById("suggestions").innerHTML = html;
}

renderSuggestions()
const client = algoliasearch('G1CLP4891G', '6786f5d4d6ec0f3ddc9fa6683d4bc2c4');
const objects = []; // Fetch your objects
const index = client.initIndex('netlify_c441371c-c790-4a40-993c-bdf9cd973932_main_all');
index.replaceAllObjects(objects).then(({ objectIDs }) => {
console.log(objectIDs);
});
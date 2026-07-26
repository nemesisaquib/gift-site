const fs = require('fs');
const path = require('path');

const fnpDataPath = path.join(__dirname, '../data/fnp.json');
const productsPath = path.join(__dirname, '../data/products.json');

const fnpData = JSON.parse(fs.readFileSync(fnpDataPath, 'utf8'));
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Create a lookup for FNP products by slug
const fnpMap = {};
fnpData.products.forEach(p => {
  fnpMap[p.slug] = p;
});

const updatedProducts = products.map(p => {
  const fnpProduct = fnpMap[p.slug];
  if (fnpProduct) {
    p.specifications = fnpProduct.details.map(d => `${d.key}: ${d.value}`);
    p.careInstructions = fnpProduct.care_instructions;
  } else {
    // Default for old products
    p.specifications = ["Material: Premium Quality", "Weight: Standard", "Packaging: Secure Box"];
    p.careInstructions = [
      "Keep away from direct sunlight.",
      "Handle with care.",
      "Clean with a soft, dry cloth."
    ];
  }
  return p;
});

fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2));
console.log('Successfully added specifications and careInstructions to products.json!');

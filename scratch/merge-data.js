const fs = require('fs');
const path = require('path');

const fnpDataPath = path.join(__dirname, '../data/fnp.json');
const productsPath = path.join(__dirname, '../data/products.json');

const fnpData = JSON.parse(fs.readFileSync(fnpDataPath, 'utf8'));

const categoryMap = {
  'Flowers': 'c1',
  'Cakes': 'c2',
  'Personalised Gifts': 'c3',
  'Plants': 'c4',
  'Chocolates': 'c5',
  'Gift Hampers': 'c6',
  'Combos': 'c7'
};

const newProducts = fnpData.products.map(p => ({
  id: p.id,
  title: p.name,
  slug: p.slug,
  categoryId: categoryMap[p.category] || 'c1',
  price: p.price,
  originalPrice: p.mrp,
  rating: p.rating,
  reviews: p.review_count,
  isBestSeller: p.tags.includes('bestseller'),
  expressDelivery: p.delivery.express_60min,
  image: p.images.main,
  description: p.description
}));

fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, 2));
console.log('Successfully updated products.json with new detailed data!');

const fs = require('fs');

async function fetchData() {
  console.log("Fetching from FakeStore API...");
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  
  // Create Categories
  const categoryMap = {
    "electronics": { id: "c1", name: "Electronics", slug: "electronics", icon: "fa-solid fa-laptop", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80", subcategories: ["Laptops", "Monitors", "Accessories"] },
    "jewelery": { id: "c2", name: "Jewelery", slug: "jewelery", icon: "fa-solid fa-gem", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80", subcategories: ["Rings", "Bracelets", "Necklaces"] },
    "men's clothing": { id: "c3", name: "Men's Clothing", slug: "mens-clothing", icon: "fa-solid fa-shirt", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80", subcategories: ["Shirts", "Jackets", "Activewear"] },
    "women's clothing": { id: "c4", name: "Women's Clothing", slug: "womens-clothing", icon: "fa-solid fa-person-dress", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80", subcategories: ["Dresses", "Tops", "Outerwear"] }
  };
  
  const categories = Object.values(categoryMap);
  
  const formattedProducts = products.map(p => {
    const cat = categoryMap[p.category];
    
    // Fake some data to match our schema
    const originalPrice = Math.round(p.price * 1.3);
    const price = Math.round(p.price);
    
    return {
      id: `p${p.id}`,
      title: p.title,
      slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      categoryId: cat.id,
      price: price * 80, // Convert to INR approx for realism if site is indian, or just keep USD. Let's keep INR since prices were like 599. So * 80.
      originalPrice: originalPrice * 80,
      rating: p.rating.rate,
      reviews: p.rating.count,
      isBestSeller: p.rating.rate > 4,
      expressDelivery: Math.random() > 0.5,
      image: p.image,
      description: p.description
    };
  });
  
  fs.writeFileSync('d:/HTML/Gift site/gift-site/data/categories.json', JSON.stringify(categories, null, 2));
  fs.writeFileSync('d:/HTML/Gift site/gift-site/data/products.json', JSON.stringify(formattedProducts, null, 2));
  console.log("Successfully wrote categories.json and products.json");
}

fetchData().catch(console.error);

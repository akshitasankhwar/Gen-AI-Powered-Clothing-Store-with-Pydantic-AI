// Product photos.
// The demo products were generated with loremflickr.com links, which no longer load,
// so those are swapped for free Pexels photos that match the product's category
// and item type (e.g. "Classic Red Saree" -> a saree photo).

const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600`;

const POOLS = {
  men: [28938765, 10618446, 6294839, 2421356, 17960004, 7828880, 12456331, 18403112, 17459735, 15880276],
  'men jacket': [16625349, 17783369, 15926574, 15870127],
  'men blazer': [34860506, 34299170, 28243024],
  'men hoodie': [14241847, 10801614, 15127546],
  women: [13012412, 29251003, 30590661, 9486295, 12083001, 5524406, 3427560, 6995877, 1601162, 10204439],
  'women dress': [24860964, 13012412, 10204439],
  'women saree': [7326221, 11629757, 7176438, 7176430, 27719401],
  'women lehenga': [33343591, 37628608, 37628619, 12062663, 35637857],
  'women kurti': [35521738, 37523799, 28512776, 13178920, 39287856],
  kids: [8084059, 30690928, 18862066, 4715320, 15227232, 9035365, 15359639, 30591142, 37529058, 30690925, 6261908],
};

export const FALLBACK_IMAGE = pexels(30590661);

// Photos used by the hero and the "shop by vibe" tiles
export const SHOWCASE = {
  hero: pexels(1926769),
  heroSmall: pexels(15926574),
  men: pexels(17783369),
  women: pexels(37628608),
  kids: pexels(8084059),
};

// Same product name -> same photo every time
function hash(text) {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

export function productImage(product = {}) {
  if (product.image && !product.image.includes('loremflickr.com')) return product.image;

  const category = (product.category || '').toLowerCase();
  const item = (product.name || '').split(' ').pop().toLowerCase();
  const pool = POOLS[`${category} ${item}`] || POOLS[category] || POOLS.women;
  return pexels(pool[hash(product.name || product.id || '') % pool.length]);
}

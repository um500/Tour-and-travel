// India States (reference-based filtering)
export const indiaStatesQuery = `
*[_type == "state" && country->type == "india"] | order(name asc) {
  name,
  "slug": slug.current
}
`;

export const internationalCountriesQuery = `
*[_type == "country" && type == "international"] | order(name asc) {
  name,
  "slug": slug.current,
  "states": *[_type == "state" && references(^._id)] | order(name asc) {
    name,
    "slug": slug.current
  }
}
`;

export const homeToursQuery = `
*[_type == "tour"] | order(_createdAt desc){
  _id,
  title,
  slug,
  price,
  duration,
  shortDescription,
  mainImage,
  category
}
`;
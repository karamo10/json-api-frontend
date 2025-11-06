export type Product = {
    id: number; 
    name: string;
    price: number;
    description?: string;
    instock?: boolean;
};
// I will be using this type forcreating new products, Id is not require when creating a product cuz backend generates it.
export type NewProduct = Omit<Product, 'id'>;
// No need to include { slug: string } in product Type or in the Form
// It is generated on the backend (via generateUniqueSlug(name)) when the product is created.

// description? and instock? are optional — a product may or may not include them.
// Why it matters:

// If a field is optional, TypeScript won’t throw an error if you create a Product object without it.

// The backend can still set a default value if the field is missing (like you did for description and instock).
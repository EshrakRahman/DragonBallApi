import {ProductSchema} from "@/schemas/productSchema.ts";
import {z} from "zod";

export async function getNewArrivalsProduct() {
    const newProductSchema = z.array(ProductSchema)
    const res = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=0&limit=10
`
    );

    const data = await res.json();
    return newProductSchema.parse(data);

}


export async function getBestSellingProduct() {
    const newProductSchema = z.array(ProductSchema)
    const res = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=10&limit=10
`
    );

    const data = await res.json();
    return newProductSchema.parse(data);

}
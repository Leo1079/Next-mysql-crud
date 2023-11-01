import { NextResponse } from "next/server";
import { pool } from "@/libs/db";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/ProcessImage";

export async function GET() {
  try {
    const allProducts = await pool.query("SELECT * FROM products");

    if (allProducts.length === 0) {
      return NextResponse.json({
        message: "Not Products yet",
      });
    }

    return NextResponse.json(allProducts);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    const buffer = await processImage(image);

    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
          },
          async (err, result) => {
            if (err) {
              reject(err);
            }

            resolve(result);
          }
        )
        .end(buffer);
    });

    const addProduct = await pool.query(" INSERT INTO products SET ?", {
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      image: res.secure_url,
    });
    return NextResponse.json({
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      id: addProduct.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

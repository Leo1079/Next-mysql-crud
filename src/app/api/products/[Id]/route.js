import cloudinary from "@/libs/cloudinary";
import { pool } from "@/libs/db";
import { processImage } from "@/libs/ProcessImage";
import { unlink } from "fs/promises";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const singleProduct = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [params.Id]
    );
    if (singleProduct.length <= 0) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(singleProduct[0]);
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

export async function PUT(request, { params }) {
  try {
    const content = await request.formData();
    const image = content.get("image");
    const updateData = {
      name: content.get("name"),
      description: content.get("description"),
      price: content.get("price"),
    };

    if (!content.get("name")) {
      return NextResponse.json(
        {
          message: "Name is required",
        },
        {
          status: 500,
        }
      );
    }

    if (image) {
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
      updateData.image = res.secure_url;
    }

    const updateProduct = await pool.query(
      "UPDATE products set ? WHERE id = ?",
      [updateData, params.Id]
    );
    if (updateProduct.affectedRows <= 0) {
      return NextResponse.json(
        {
          message: "Product Not Found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedProduct = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [params.Id]
    );
    return NextResponse.json(updatedProduct);
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

export async function DELETE(request, { params }) {
  try {
    const deleteProduct = await pool.query(
      "DELETE FROM products WHERE id = ?",
      [params.Id]
    );
    if (deleteProduct.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Product Not Found",
        },
        {
          status: 404,
        }
      );
    }

    return new Response(null, {
      status: 204,
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

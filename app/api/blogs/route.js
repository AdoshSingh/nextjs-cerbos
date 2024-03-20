import { NextResponse } from "next/server";
import { getAllBlogs } from "@/utils/service";

export async function GET(){
  try {
    const blogs = await getAllBlogs();
    return NextResponse.json({data: blogs});
  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 500, error: 'Internal Server Error'});
  }
}
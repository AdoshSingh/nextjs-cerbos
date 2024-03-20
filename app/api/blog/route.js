import { NextResponse } from "next/server";
import { cerbos } from "../../../lib/cerbos-client";
import { users } from "@/data/dummy";
import { getBlog, updateBlog, deleteBlog } from "../../../utils/service";

export async function GET(req){
  try {
    const blogId = req.nextUrl.searchParams.get("blogId");
    const userId = req.nextUrl.searchParams.get("userId");
    const blog = await getBlog(blogId);
  
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" });
    }
  
    const user = { id: users[userId].name, roles: [users[userId].role] };
    const actions = ["read"];
    const resourceKind = "blog";
  
    const result = await cerbos.checkResource({
      principal: {
        id: user.id,
        roles: user.roles,
        attributes: user,
      },
      resource: {
        kind: resourceKind,
        id: blog.id,
        attributes: blog,
      },
      actions: actions,
    });
  
    if (result.isAllowed("read")) {
      return new NextResponse(JSON.stringify({ data: blog }), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function PATCH(req){

  try {
    
    const body = await req.json(); 
  
    const blogId = req.nextUrl.searchParams.get("blogId");
    const userId = req.nextUrl.searchParams.get("userId");
  
    const blog = await getBlog(blogId);
  
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" });
    }
  
    const user = { id: users[userId].name, roles: [users[userId].role] };
    const actions = ["update"];
    const resourceKind = "blog";
  
    const result = await cerbos.checkResource({
      principal: {
        id: user.id,
        roles: user.roles,
        attributes: user,
      },
      resource: {
        kind: resourceKind,
        id: blog.id,
        attributes: blog,
      },
      actions: actions,
    });
  
    if (result.isAllowed("update")) {
      const updatedBlog = await updateBlog(blogId, body);
      return new NextResponse(JSON.stringify({ data: updatedBlog }), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }


}

export async function DELETE(req){
  try{

    const blogId = req.nextUrl.searchParams.get("blogId");
    const userId = req.nextUrl.searchParams.get("userId");
  
    const blog = await getBlog(blogId);
  
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" });
    }
  
    const user = { id: users[userId].name, roles: [users[userId].role] };
    const actions = ["delete"];
    const resourceKind = "blog";
  
    const result = await cerbos.checkResource({
      principal: {
        id: user.id,
        roles: user.roles,
        attributes: user,
      },
      resource: {
        kind: resourceKind,
        id: blog.id,
        attributes: blog,
      },
      actions: actions,
    });
  
    if (result.isAllowed("delete")) {
      const res = await deleteBlog(blogId);
      return new NextResponse(JSON.stringify({ status: "ok", deleted: res }), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

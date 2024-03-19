import {blogs} from "@/data/dummy";

export async function getBlog(id) {
  return blogs[id] || null;
}

export async function updateBlog(id, updateData) {
  if (!blogs[id]) return null;
  blogs[id] = { ...blogs[id], ...updateData };
  return blogs[id];
}

export async function deleteBlog(id) {
  if (blogs[id]) {
    delete blogs[id];
    return true;
  } else {
    return false;
  }
}
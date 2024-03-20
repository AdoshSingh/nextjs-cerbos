"use client";

import { useEffect, useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBlogs(data.data);
      });
  }, []);

  const openDeleteModal = (blogId) => {
    setDeleteBlogId(blogId);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {

    const blogOwner = deleteUserId;
    let userId;

    switch (blogOwner) {
      case "user1":
        userId = 1;
        break;
      case "user2":
        userId = 2;
        break;
      case "user3":
        userId = 3;
        break;
      case "user4":
        userId = 4;
        break;
      case "user5":
        userId = 5;
        break;
      default:
        break;
    }

      const response = await fetch(
        `/api/blog?blogId=${deleteBlogId}&userId=${userId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert("Blog deleted successfully");
        setBlogs((prevBlogs) => {
          const {[deleteBlogId]: _, ...remainingBlogs} = prevBlogs;
          return remainingBlogs;
        });
      } else {
        alert("Unauthorized user");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const openModal = (blogId) => {
    setCurrentBlog({ ...blogs[blogId] });
    setIsModalOpen(true);
  };

  const handleOwnerChange = (event) => {
    setCurrentBlog({ ...currentBlog, owner: event.target.value });
  };

  const handleTitleChange = (event) => {
    setCurrentBlog({ ...currentBlog, title: event.target.value });
  };

  const handleContentChange = (event) => {
    setCurrentBlog({ ...currentBlog, content: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blogId = currentBlog.id;
    const blogOwner = currentBlog.owner;
    let userId;

    switch (blogOwner) {
      case "user1":
        userId = 1;
        break;
      case "user2":
        userId = 2;
        break;
      case "user3":
        userId = 3;
        break;
      case "user4":
        userId = 4;
        break;
      case "user5":
        userId = 5;
        break;
      default:
        break;
    }

    try {
      const response = await fetch(
        `/api/blog?blogId=${blogId}&userId=${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: currentBlog.title,
            content: currentBlog.content,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Blog updated successfully:", data);
        setBlogs((prevBlogs) => {
          const updatedBlogs = { ...prevBlogs };
          updatedBlogs[blogId] = data.data;
          return updatedBlogs;
        });
        setIsModalOpen(false);
      } else {
        alert(`Unauthorized user`);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Error updating blog");
    }
  };

  return (
    <div className=" max-w-4xl mx-auto px-4 py-8">
      {blogs &&
        Object.keys(blogs).map((key) => (
          <div
            key={key}
            className="mb-10 p-5 border-2 rounded-xl shadow-lg bg-gray-200"
          >
            <h1 className="text-2xl font-bold text-gray-800">
              {blogs[key].title}
            </h1>
            <p className="mt-2 text-gray-600">{blogs[key].content}</p>
            <p className="mt-4 text-gray-500">Written by: {blogs[key].owner} {blogs[key].owner === 'user2' ? '(admin)' : ''} {blogs[key].owner === 'user5' ? '(admin)' : ''}</p>
            <div className="mt-5 flex justify-end space-x-3">
              <button
                onClick={() => openModal(blogs[key].id)}
                className="bg-cerbosYellow text-white py-2 px-4 rounded hover:bg-cerbosDarkYellow transition duration-150 ease-in-out"
              >
                Edit Blog
              </button>
              <button
                onClick={() => openDeleteModal(blogs[key].id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-150 ease-in-out"
              >
                Delete Blog
              </button>
            </div>
          </div>
        ))}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md"
          >
            <div>
              <label
                htmlFor="owner"
                className="block text-sm font-medium text-gray-700"
              >
                Owner
              </label>
              <select
                id="owner"
                value={currentBlog.owner}
                onChange={handleOwnerChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
              >
                {["user1", "user2", "user3", "user4", "user5"].map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={currentBlog.title}
                onChange={handleTitleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <textarea
                id="content"
                rows="3"
                value={currentBlog.content}
                onChange={handleContentChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
              ></textarea>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-150 ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-cerbosYellow text-white py-2 px-4 rounded hover:bg-cerbosDarkYellow transition duration-150 ease-in-out"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-medium">Who is deleting this blog?</h3>
            <select
              value={deleteUserId}
              onChange={(e) => setDeleteUserId(e.target.value)}
              className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
            >
              <option value="">Select User</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
              <option value="user4">User 4</option>
              <option value="user5">User 5</option>
            </select>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete Blog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

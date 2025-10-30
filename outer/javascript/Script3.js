"use strict";

// Sample posts data
const samplePosts = [
  {
    community: "r/SportsIndia",
    communityIcon: "mainIImages/bcci.svg",
    title: "Virat Kohli retires after scoring 9230 runs in test cricket",
    image: "mainIImages/vk.jpg",
    timeAgo: "4 days ago",
  },
  // ... keep all your existing sample posts here
];

// DOM Elements
const createPostBtn = document.getElementById("createPostBtn");
const createPostModal = document.getElementById("createPostModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelPostBtn = document.getElementById("cancelPostBtn");
const submitPostBtn = document.getElementById("submitPostBtn");
const postsContainer = document.getElementById("postsContainer");

// Initialize posts
function initializePosts() {
  postsContainer.innerHTML = "";
  const savedPosts =
    JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;

  savedPosts.forEach((post, index) => {
    createPostElement(post, index);
  });
}

// Function to create post element with delete button
function createPostElement(post, index) {
  const postElement = document.createElement("div");
  postElement.className = "post-container";
  postElement.setAttribute("data-post-id", index);

  postElement.innerHTML = `
        <div class="logo-text-div">
            <div class="left-side-div">
                <img src="${post.communityIcon}" alt="${post.community} icon"> 
                <h5>${post.community}</h5>
                <p><sup id="dot">.</sup>${post.timeAgo}</p>
            </div>
            <div class="rightside-div">
                <button class="join">Join</button>
                <div class="post-actions">
                    <button class="delete-post-btn" title="Delete post">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2Q3ZGFkYyI+PHBhdGggZD0iTTYgMTlhMSAxIDAgMDAxIDFoMTBhMSAxIDAgMDAxLTFWN0g2djEyek0xOSA0aC0zLjVsLTEtMWgtNWwtMSAxSDV2MmgxNFY0eiIvPjwvc3ZnPg==" alt="Delete">
                    </button>
                    <a href="#"><img src="mainIImages/more.png" alt="More options"></a>
                </div>
            </div>
        </div>
        <div class="desc-div">
            <p>${post.title}</p>
        </div>
        ${
          post.image
            ? `
        <div class="img-div-post">
            <img src="${post.image}" alt="Post image">
        </div>
        `
            : ""
        }
        <div class="like-unlike">
            <img src="mainIImages/like.png" alt="Like" class="cursor likeBtns">
            <img src="mainIImages/commentPost.png" alt="Comment" class="cursor">
            <img src="mainIImages/savePost.png" alt="Save" class="cursor">
        </div>
        <div class="space">
            <hr>
        </div>
    `;

  postsContainer.prepend(postElement);

  // Add event listener to delete button
  const deleteBtn = postElement.querySelector(".delete-post-btn");
  deleteBtn.addEventListener("click", function () {
    deletePost(index);
  });

  // Add event listener to join button
  const joinBtn = postElement.querySelector(".join");
  joinBtn.addEventListener("click", function () {
    if (joinBtn.textContent === "Join") {
      joinBtn.textContent = "Joined";
    } else {
      joinBtn.textContent = "Join";
    }
  });
}

// Function to delete post
function deletePost(postIndex) {
  if (confirm("Are you sure you want to delete this post?")) {
    const savedPosts =
      JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;
    savedPosts.splice(postIndex, 1);
    localStorage.setItem("reddixPosts", JSON.stringify(savedPosts));
    initializePosts();
    showNotification("Post deleted successfully");
  }
}

// Function to show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "delete-notification";
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #ff4500;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 3000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .post-actions {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .delete-post-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 6px;
        border-radius: 4px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .delete-post-btn:hover {
        background-color: #343536;
    }
    
    .delete-post-btn img {
        width: 18px;
        height: 18px;
        filter: invert(0.7);
    }
    
    .delete-post-btn:hover img {
        filter: invert(0.9);
    }
    
    .light-mode .delete-post-btn:hover {
        background-color: var(--hover-bg);
    }
    
    .light-mode .delete-post-btn img {
        filter: invert(0.4);
    }
`;
document.head.appendChild(style);

// Modal functionality
createPostBtn.addEventListener("click", function () {
  createPostModal.classList.remove("hidden");
});

function closeModal() {
  createPostModal.classList.add("hidden");
  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  document.getElementById("postImage").value = "";
}

closeModalBtn.addEventListener("click", closeModal);
cancelPostBtn.addEventListener("click", closeModal);

// Create post functionality
submitPostBtn.addEventListener("click", function () {
  const community = document.getElementById("communitySelect").value;
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();
  const imageUrl = document.getElementById("postImage").value.trim();

  if (!title) {
    alert("Please add a title to your post");
    return;
  }

  let communityIcon = "mainIImages/bcci.svg";
  if (community === "r/Pikachu") communityIcon = "mainIImages/pika.jpg";
  else if (community === "r/memeIndia") communityIcon = "mainIImages/meme.jpg";
  else if (community === "r/cplusplus") communityIcon = "mainIImages/c++.png";
  else if (community === "r/English")
    communityIcon = "mainIImages/logoimage.jpg";

  const newPost = {
    community: community,
    communityIcon: communityIcon,
    title: title,
    content: content,
    image: imageUrl || null,
    timeAgo: "Just now",
  };

  const existingPosts =
    JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;
  existingPosts.unshift(newPost);
  localStorage.setItem("reddixPosts", JSON.stringify(existingPosts));

  createPostElement(newPost, 0);
  closeModal();
});

// Image preview functionality
document.getElementById("postImage").addEventListener("input", function () {
  const imageUrl = this.value.trim();
  const imagePreview = document.getElementById("imagePreview");
  if (imageUrl) {
    imagePreview.querySelector("img").src = imageUrl;
    imagePreview.style.display = "block";
  } else {
    imagePreview.style.display = "none";
  }
});

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  initializePosts();

  // Your existing night mode functionality
  const modeSwitch = document.querySelector(".nightMode");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  if (
    currentTheme === "light" ||
    (!currentTheme && !prefersDarkScheme.matches)
  ) {
    enableLightMode();
  } else {
    document.body.classList.remove("light-mode");
  }

  modeSwitch.addEventListener("click", function () {
    if (document.body.classList.contains("light-mode")) {
      disableLightMode();
    } else {
      enableLightMode();
    }
  });

  function enableLightMode() {
    document.body.classList.add("light-mode");
    modeSwitch.src = `sun.png`;
    modeSwitch.style.filter = "invert(0.4)";
    localStorage.setItem("theme", "light");
  }

  function disableLightMode() {
    document.body.classList.remove("light-mode");
    modeSwitch.src = `moon.png`;
    modeSwitch.style.filter = "invert(0.8)";
    localStorage.setItem("theme", "dark");
  }
});

// Notification System

// dztrxytucyivuogfihycfxlcvxh 
// rsydtufyiu
// class NotificationManager {
//   constructor() {
//     this.notifications =
//       JSON.parse(localStorage.getItem("reddixNotifications")) || [];
//     this.badge = document.getElementById("notificationBadge");
//     this.dropdown = document.getElementById("notificationDropdown");
//     this.list = document.getElementById("notificationList");
//     this.clearAllBtn = document.getElementById("clearAllNotifications");
//     this.notificationIcon = document.querySelector(".notification-icon");

//     this.init();
//   }

//   init() {
//     this.renderNotifications();
//     this.attachEventListeners();
//     this.updateBadge();
//   }

//   attachEventListeners() {
//     // Toggle dropdown
//     this.notificationIcon.addEventListener("click", (e) => {
//       e.stopPropagation();
//       this.toggleDropdown();
//     });

//     // Clear all notifications
//     this.clearAllBtn.addEventListener("click", () => {
//       this.clearAllNotifications();
//     });

//     // Close dropdown when clicking outside
//     document.addEventListener("click", () => {
//       this.hideDropdown();
//     });

//     // Prevent dropdown from closing when clicking inside
//     this.dropdown.addEventListener("click", (e) => {
//       e.stopPropagation();
//     });
//   }

//   toggleDropdown() {
//     this.dropdown.classList.toggle("hidden");
//     if (!this.dropdown.classList.contains("hidden")) {
//       this.markAllAsRead();
//     }
//   }

//   hideDropdown() {
//     this.dropdown.classList.add("hidden");
//   }

//   addNotification(type, message, postTitle = "") {
//     const notification = {
//       id: Date.now(),
//       type: type, // 'create' or 'delete'
//       message: message,
//       postTitle: postTitle,
//       timestamp: new Date().toISOString(),
//       read: false,
//     };

//     this.notifications.unshift(notification);
//     this.saveNotifications();
//     this.renderNotifications();
//     this.updateBadge();
//     this.showNotificationBadge();
//   }

//   showNotificationBadge() {
//     this.badge.classList.remove("hidden");
//   }

//   markAllAsRead() {
//     this.notifications.forEach((notification) => {
//       notification.read = true;
//     });
//     this.saveNotifications();
//     this.renderNotifications();
//     this.updateBadge();
//   }

//   clearAllNotifications() {
//     this.notifications = [];
//     this.saveNotifications();
//     this.renderNotifications();
//     this.updateBadge();
//   }

//   renderNotifications() {
//     if (this.notifications.length === 0) {
//       this.list.innerHTML = `
//                 <div class="empty-notifications">
//                     No notifications yet
//                 </div>
//             `;
//       return;
//     }

//     this.list.innerHTML = this.notifications
//       .map(
//         (notification) => `
//             <div class="notification-item ${
//               notification.read ? "" : "unread"
//             }" data-id="${notification.id}">
//                 <div class="notification-content">
//                     <div class="notification-icon-small ${notification.type}">
//                         <img src="${
//                           notification.type === "create"
//                             ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzRjYWY1MCI+PHBhdGggZD0iTTkgMTZoNnYtMkg5djJ6bS0yLTRoMTBWNkg3djZ6bTUgMTBjLTMuODcgMC03LTMuMTMtNy03czMuMTMtNyA3LTcgNyAzLjEzIDcgNy0zLjEzIDctNyA3em0wLTE2Yy00Ljk2IDAtOSA0LjA0LTkgOXM0LjA0IDkgOSA5IDktNC4wNCA5LTktNC4wNC05LTktOXoiLz48L3N2Zz4="
//                             : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2Y0NDMzNiI+PHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnoiLz48L3N2Zz4="
//                         }" 
//                             alt="${notification.type}">
//                     </div>
//                     <div class="notification-text">
//                         <div class="notification-title">
//                             ${
//                               notification.type === "create"
//                                 ? "Post Created"
//                                 : "Post Deleted"
//                             }
//                         </div>
//                         <div class="notification-message">
//                             ${notification.message}
//                         </div>
//                         ${
//                           notification.postTitle
//                             ? `
//                         <div class="notification-message" style="font-style: italic;">
//                             "${notification.postTitle}"
//                         </div>
//                         `
//                             : ""
//                         }
//                         <div class="notification-time">
//                             ${this.formatTime(notification.timestamp)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `
//       )
//       .join("");
//   }

//   formatTime(timestamp) {
//     const now = new Date();
//     const time = new Date(timestamp);
//     const diffInMinutes = Math.floor((now - time) / (1000 * 60));

//     if (diffInMinutes < 1) return "Just now";
//     if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
//     if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
//     return `${Math.floor(diffInMinutes / 1440)}d ago`;
//   }

//   updateBadge() {
//     const unreadCount = this.notifications.filter((n) => !n.read).length;
//     this.badge.textContent = unreadCount;

//     if (unreadCount === 0) {
//       this.badge.classList.add("hidden");
//     } else {
//       this.badge.classList.remove("hidden");
//     }
//   }

//   saveNotifications() {
//     localStorage.setItem(
//       "reddixNotifications",
//       JSON.stringify(this.notifications)
//     );
//   }
// }

// Initialize Notification Manager
let notificationManager;

// Update your deletePost function to use notifications
function deletePost(postIndex) {
  if (confirm("Are you sure you want to delete this post?")) {
    const savedPosts =
      JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;
    const deletedPost = savedPosts[postIndex];

    savedPosts.splice(postIndex, 1);
    localStorage.setItem("reddixPosts", JSON.stringify(savedPosts));
    initializePosts();

    // Add notification
    notificationManager.addNotification(
      "delete",
      "Your post has been deleted successfully",
      deletedPost.title
    );
  }
}

// Update your create post functionality to use notifications
submitPostBtn.addEventListener("click", function () {
  const community = document.getElementById("communitySelect").value;
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();
  const imageUrl = document.getElementById("postImage").value.trim();

  if (!title) {
    alert("Please add a title to your post");
    return;
  }

  let communityIcon = "mainIImages/bcci.svg";
  if (community === "r/Pikachu") communityIcon = "mainIImages/pika.jpg";
  else if (community === "r/memeIndia") communityIcon = "mainIImages/meme.jpg";
  else if (community === "r/cplusplus") communityIcon = "mainIImages/c++.png";
  else if (community === "r/English")
    communityIcon = "mainIImages/logoimage.jpg";

  const newPost = {
    community: community,
    communityIcon: communityIcon,
    title: title,
    content: content,
    image: imageUrl || null,
    timeAgo: "Just now",
  };

  const existingPosts =
    JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;
  existingPosts.unshift(newPost);
  localStorage.setItem("reddixPosts", JSON.stringify(existingPosts));

  createPostElement(newPost, 0);
  closeModal();

  // Add notification
  notificationManager.addNotification(
    "create",
    "Your post has been published successfully",
    title
  );
});

// Initialize notification manager when page loads
document.addEventListener("DOMContentLoaded", function () {
  initializePosts();
  notificationManager = new NotificationManager();

  // Your existing night mode functionality...
});

// Search Functionality
class SearchManager {
  constructor() {
    this.searchInput = document.getElementById("searchInput");
    this.clearSearchBtn = document.getElementById("clearSearch");
    this.postsContainer = document.getElementById("postsContainer");
    this.allPosts = [];

    this.init();
  }

  init() {
    this.loadAllPosts();
    this.attachEventListeners();
  }

  loadAllPosts() {
    this.allPosts =
      JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;
  }

  attachEventListeners() {
    // Real-time search
    this.searchInput.addEventListener("input", (e) => {
      this.handleSearch(e.target.value);
    });

    // Clear search
    this.clearSearchBtn.addEventListener("click", () => {
      this.clearSearch();
    });

    // Enter key to search
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleSearch(e.target.value);
      }
    });

    // Show/hide clear button based on input
    this.searchInput.addEventListener("input", (e) => {
      this.toggleClearButton(e.target.value);
    });
  }

  handleSearch(searchTerm) {
    const trimmedTerm = searchTerm.trim().toLowerCase();

    if (trimmedTerm === "") {
      this.showAllPosts();
      return;
    }

    this.performSearch(trimmedTerm);
  }

  performSearch(searchTerm) {
    this.loadAllPosts(); // Refresh posts data

    const filteredPosts = this.allPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchTerm) ||
        (post.content && post.content.toLowerCase().includes(searchTerm)) ||
        post.community.toLowerCase().includes(searchTerm)
      );
    });

    this.displaySearchResults(filteredPosts, searchTerm);
  }

  displaySearchResults(posts, searchTerm) {
    this.postsContainer.innerHTML = "";

    if (posts.length === 0) {
      this.showNoResults(searchTerm);
      return;
    }

    // Add search results info
    const resultsInfo = document.createElement("div");
    resultsInfo.className = "search-results-info";
    resultsInfo.textContent = `${posts.length} result${
      posts.length !== 1 ? "s" : ""
    } found for "${searchTerm}"`;
    this.postsContainer.appendChild(resultsInfo);

    // Display filtered posts with highlighting
    posts.forEach((post, index) => {
      const postElement = this.createSearchPostElement(post, searchTerm, index);
      this.postsContainer.appendChild(postElement);
    });
  }

  createSearchPostElement(post, searchTerm, index) {
    const postElement = document.createElement("div");
    postElement.className = "post-container";
    postElement.setAttribute("data-post-id", index);

    // Highlight search term in title
    const highlightedTitle = this.highlightText(post.title, searchTerm);

    postElement.innerHTML = `
            <div class="logo-text-div">
                <div class="left-side-div">
                    <img src="${post.communityIcon}" alt="${
      post.community
    } icon"> 
                    <h5>${post.community}</h5>
                    <p><sup id="dot">.</sup>${post.timeAgo}</p>
                </div>
                <div class="rightside-div">
                    <button class="join">Join</button>
                    <div class="post-actions">
                        <button class="delete-post-btn" title="Delete post">
                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2Q3ZGFkYyI+PHBhdGggZD0iTTYgMTlhMSAxIDAgMDAxIDFoMTBhMSAxIDAgMDAxLTFWN0g2djEyek0xOSA0aC0zLjVsLTEtMWgtNWwtMSAxSDV2MmgxNFY0eiIvPjwvc3ZnPg==" alt="Delete">
                        </button>
                        <a href="#"><img src="mainIImages/more.png" alt="More options"></a>
                    </div>
                </div>
            </div>
            <div class="desc-div">
                <p>${highlightedTitle}</p>
            </div>
            ${
              post.image
                ? `
            <div class="img-div-post">
                <img src="${post.image}" alt="Post image">
            </div>
            `
                : ""
            }
            <div class="like-unlike">
                <img src="mainIImages/like.png" alt="Like" class="cursor likeBtns">
                <img src="mainIImages/commentPost.png" alt="Comment" class="cursor">
                <img src="mainIImages/savePost.png" alt="Save" class="cursor">
            </div>
            <div class="space">
                <hr>
            </div>
        `;

    // Add event listeners
    this.attachPostEventListeners(postElement, index);

    return postElement;
  }

  highlightText(text, searchTerm) {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, "gi");
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  attachPostEventListeners(postElement, index) {
    // Delete button
    const deleteBtn = postElement.querySelector(".delete-post-btn");
    deleteBtn.addEventListener("click", () => {
      this.deletePostFromSearch(index);
    });

    // Join button
    const joinBtn = postElement.querySelector(".join");
    joinBtn.addEventListener("click", function () {
      if (this.textContent === "Join") {
        this.textContent = "Joined";
      } else {
        this.textContent = "Join";
      }
    });
  }

  deletePostFromSearch(postIndex) {
    if (confirm("Are you sure you want to delete this post?")) {
      const savedPosts =
        JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;
      const deletedPost = savedPosts[postIndex];

      savedPosts.splice(postIndex, 1);
      localStorage.setItem("reddixPosts", JSON.stringify(savedPosts));

      // Refresh search results
      const currentSearch = this.searchInput.value.trim();
      if (currentSearch) {
        this.performSearch(currentSearch);
      } else {
        this.showAllPosts();
      }

      // Add notification
      if (notificationManager) {
        notificationManager.addNotification(
          "delete",
          "Your post has been deleted successfully",
          deletedPost.title
        );
      }
    }
  }

  showNoResults(searchTerm) {
    this.postsContainer.innerHTML = `
            <div class="no-results">
                <h3>No results found for "${searchTerm}"</h3>
                <p>Try searching for something else or check your spelling</p>
            </div>
        `;
  }

  showAllPosts() {
    initializePosts();
  }

  clearSearch() {
    this.searchInput.value = "";
    this.showAllPosts();
    this.toggleClearButton("");
    this.searchInput.focus();
  }

  toggleClearButton(searchTerm) {
    if (searchTerm.trim() !== "") {
      this.clearSearchBtn.classList.remove("hidden");
    } else {
      this.clearSearchBtn.classList.add("hidden");
    }
  }
}

// Initialize Search Manager
let searchManager;

// Update your initializePosts function to work with search
function initializePosts() {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";
  const savedPosts =
    JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;

  savedPosts.forEach((post, index) => {
    createPostElement(post, index);
  });
}

// Update your createPostElement function (remove the prepend part)
function createPostElement(post, index) {
  const postElement = document.createElement("div");
  postElement.className = "post-container";
  postElement.setAttribute("data-post-id", index);

  postElement.innerHTML = `
        <div class="logo-text-div">
            <div class="left-side-div">
                <img src="${post.communityIcon}" alt="${post.community} icon"> 
                <h5>${post.community}</h5>
                <p><sup id="dot">.</sup>${post.timeAgo}</p>
            </div>
            <div class="rightside-div">
                <button class="join">Join</button>
                <div class="post-actions">
                    <button class="delete-post-btn" title="Delete post">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2Q3ZGFkYyI+PHBhdGggZD0iTTYgMTlhMSAxIDAgMDAxIDFoMTBhMSAxIDAgMDAxLTFWN0g2djEyek0xOSA0aC0zLjVsLTEtMWgtNWwtMSAxSDV2MmgxNFY0eiIvPjwvc3ZnPg==" alt="Delete">
                    </button>
                    <a href="#"><img src="mainIImages/more.png" alt="More options"></a>
                </div>
            </div>
        </div>
        <div class="desc-div">
            <p>${post.title}</p>
        </div>
        ${
          post.image
            ? `
        <div class="img-div-post">
            <img src="${post.image}" alt="Post image">
        </div>
        `
            : ""
        }
        <div class="like-unlike">
            <img src="mainIImages/like.png" alt="Like" class="cursor likeBtns">
            <img src="mainIImages/commentPost.png" alt="Comment" class="cursor">
            <img src="mainIImages/savePost.png" alt="Save" class="cursor">
        </div>
        <div class="space">
            <hr>
        </div>
    `;

  postsContainer.appendChild(postElement);

  // Add event listeners (keep your existing code here)
  const deleteBtn = postElement.querySelector(".delete-post-btn");
  deleteBtn.addEventListener("click", function () {
    deletePost(index);
  });

  const joinBtn = postElement.querySelector(".join");
  joinBtn.addEventListener("click", function () {
    if (joinBtn.textContent === "Join") {
      joinBtn.textContent = "Joined";
    } else {
      joinBtn.textContent = "Join";
    }
  });
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  initializePosts();
  notificationManager = new NotificationManager();
  searchManager = new SearchManager();
  // Your existing night mode functionality...
});

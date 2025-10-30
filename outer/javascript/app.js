"use strict";





// Sample posts data
let posts = [
  
   {
        id: 1,
        community: "r/SportsIndia",
        communityIcon: "mainIImages/bcci.svg",
        title: "Virat Kohli retires after scoring 9230 runs in test cricket",
        content: "Legendary Indian batsman Virat Kohli announces his retirement from international cricket after an illustrious career.",
        image: "mainIImages/vk.jpg",
        timestamp: "4 days ago",
        likes: 0,
        liked: false,
        saved: false,
        canDelete: true
    },
  {
    id: 2,
    community: "r/SportsIndia",
    communityIcon: "mainIImages/dice.png",
    title: "Demon Slayer Infinity Castle",
    content: "The epic fight between Tanjiro and Muzan continues in the Infinity Castle arc.",
    image: "mainIImages/demon.jpg",
    timestamp: "4 days ago",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true
  },
  {
    id: 3,
    community: "r/SportsIndia",
    communityIcon: "mainIImages/bcci.svg",
    title: "Brothers",
    content: "",
    image: "mainIImages/WhatsApp Image 2025-03-30 at 12.01.08_344fb055.jpg",
    timestamp: "4 days ago",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true
  },
  {
    id: 4,
    community: "r/SportsIndia1",
    communityIcon: "mainIImages/vk.jpg",
    title: "Messi to take his tike on World Cup Decesion",
    content: "Will Messi plays his Final",
    image: "mainIImages/messi.jpg",
    timestamp: "4 days ago",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true
  },
  {
    id: 5,
    community: "r/SportsIndia",
    communityIcon: "mainIImages/bcci.svg",
    title: "How Neo-Nazis used protesters for their own propaganda",
    content: "Neo-Nazis used protesters for their own propaganda",
    image: "mainIImages/protest.webp",
    timestamp: "1 days ago",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true
  },
  {
    id: 6,
    community: "r/SportsIndia",
    communityIcon: "mainIImages/c++.png",
    title: "Rover in Mars",
    content: "",
    image: "mainIImages/mars.avif",
    timestamp: "1 days ago",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true
  },
  {
    id: 7,
    community: "r/SportsIndia",
    communityIcon: "mainIImages/max-verstappen-red-bull-racing.jpg",
    title: "Know about F1 racer Max Verstappen",
    content: "",
    image: "mainIImages/max-verstappen-red-bull-racing.jpg",
    timestamp: "1 days ago",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true
  },
  {
    id: 8,
    community: "r/SportsIndia",
    communityIcon: "mainIImages/car.png",
    title: "Islam next Fight ??",
    content: "UFC champion Islam Makhachev will defend his title in an epic fight against Charles Oliveira in the main event.",
    image: "mainIImages/islam.jpg",
    timestamp: "1 days ago",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true
  },
  {
    id: 9,
    community: "r/SportsIndia",
    communityIcon: "mainIImages/advertise.png",
    title: "Dream Destination !!",
    content: "",
    image: "mainIImages/dubai.avif",
    timestamp: "1 days ago",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true
  },
  {
    id: 10,
    community: "r/SportsIndia",
    communityIcon: "mainIImages/advertise.png",
    title: "The Conjuring: Last Rites",
    content: "",
    image: "mainIImages/counjouring.webp",
    timestamp: "1 days ago",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true
  },
  {
    id: 11,
    community: "r/SportsIndia",
    communityIcon: "mainIImages/counjouring.webp",
    title: "Horror Movies",
    content: "",
    image: "mainIImages/counj2.webp",
    timestamp: "1 days ago",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true
  },
  {
    id: 12,
    community: "r/SportsIndia",
    communityIcon: "mainIImages/dubai.avif",
    title: "GTA-VI LEAKS",
    content: "",
    image: "mainIImages/gta6.jpg",
    timestamp: "1 days ago",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true 
  },
];

// DOM Elements
const createPostBtn = document.getElementById("createPostBtn");
const createPostModal = document.getElementById("createPostModal");
const closeModal = document.getElementById("closeModal");
const cancelPost = document.getElementById("cancelPost");
const submitPost = document.getElementById("submitPost");
const createPostForm = document.getElementById("createPostForm");
const postImage = document.getElementById("postImage");
const imagePreview = document.getElementById("imagePreview");
const previewImg = document.getElementById("previewImg");
const postsContainer = document.getElementById("postsContainer");
const communitySelect = document.getElementById("community");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const communityError = document.getElementById("communityError");
const titleError = document.getElementById("titleError");

// DOM Elements for delete functionality
const deleteModal = document.getElementById("deleteModal");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");
let postToDelete = null;

// Load posts from localStorage if available
function loadPosts() {
  const savedPosts = localStorage.getItem("reddixPosts");
  if (savedPosts) {
    posts = JSON.parse(savedPosts);
  }
  renderPosts();
}

// Save posts to localStorage
function savePosts() {
  localStorage.setItem("reddixPosts", JSON.stringify(posts));
}

// Render posts to the page WITH DELETE BUTTONS
function renderPosts() {
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post-container";
    postElement.innerHTML = `
      <div class="logo-text-div">
        <div class="left-side-div">
          <img src="${post.communityIcon}" alt="${post.community}"> 
          <h5>${post.community}</h5>
          <p> <sup id="dot">.</sup>${post.timestamp}</p>
        </div>
        <div class="rightside-div">
          <button class="join">Join</button>
          ${post.canDelete ? `
            <button class="delete-btn" data-id="${post.id}">
              <i class="fas fa-trash"></i> Delete
            </button>
          ` : ''}
          <a href="#"><img src="mainIImages/more.png" alt="" class="more-ing"></a>
        </div>
      </div>
      <div class="desc-div">
        <p>${post.title}</p>
      </div>
      ${post.image ? `
        <div class="img-div-post">
          <img src="${post.image}" alt="${post.title}">
        </div>
      ` : ""}
      <div class="like-unlike">
        <img src="${post.liked ? 'mainIImages/like-filled.png' : 'mainIImages/like.png'}" 
             alt="Like" class="cursor likeBtns" data-id="${post.id}">
        <img src="mainIImages/commentPost.png" alt="Comment" class="cursor">
        <img src="${post.saved ? 'mainIImages/savePost-filled.png' : 'mainIImages/savePost.png'}" 
             alt="Save" class="cursor savedd" data-id="${post.id}">
      </div>
      <div class="space">
        <hr>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });

  // Add event listeners for like and save buttons
  document.querySelectorAll(".likeBtns").forEach((btn) => {
    btn.addEventListener("click", function () {
      const postId = parseInt(this.getAttribute("data-id"));
      toggleLike(postId);
    });
  });

  document.querySelectorAll(".savedd").forEach((btn) => {
    btn.addEventListener("click", function () {
      const postId = parseInt(this.getAttribute("data-id"));
      toggleSave(postId);
    });
  });

  // Add event listeners for delete buttons
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const postId = parseInt(this.getAttribute("data-id"));
      showDeleteModal(postId);
    });
  });
}

// Toggle like status
function toggleLike(postId) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.liked = !post.liked;
    post.likes = post.liked ? post.likes + 1 : post.likes - 1;
    savePosts();
    renderPosts();
  }
}

// Toggle save status
function toggleSave(postId) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.saved = !post.saved;
    savePosts();
    renderPosts();
  }
}

// Show delete confirmation modal
function showDeleteModal(postId) {
  postToDelete = postId;
  deleteModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// Hide delete confirmation modal
function hideDeleteModal() {
  deleteModal.style.display = "none";
  document.body.style.overflow = "auto";
  postToDelete = null;
}

// Delete post function
function deletePost() {
  if (postToDelete !== null) {
    // Remove post from array
    posts = posts.filter((post) => post.id !== postToDelete);
    
    // Save to localStorage
    savePosts();
    
    // Re-render posts
    renderPosts();
    
    // Hide modal
    hideDeleteModal();
    
    // Show success message
    showNotification("Post deleted successfully");
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background-color: #1a1a1b;
    color: #d7dadc;
    padding: 12px 20px;
    border-radius: 8px;
    border: 1px solid #343536;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1000;
    transition: all 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Show modal
function showModal() {
  createPostModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// Hide modal
function hideModal() {
  createPostModal.style.display = "none";
  document.body.style.overflow = "auto";
  resetForm();
}

// Reset form
function resetForm() {
  createPostForm.reset();
  imagePreview.style.display = "none";
  previewImg.src = "";
  submitPost.disabled = true;
  hideErrors();
}

// Hide all error messages
function hideErrors() {
  communityError.style.display = "none";
  titleError.style.display = "none";
}

// Validate form
function validateForm() {
  let isValid = true;

  if (!communitySelect.value) {
    communityError.style.display = "block";
    isValid = false;
  } else {
    communityError.style.display = "none";
  }

  if (!postTitle.value.trim()) {
    titleError.style.display = "block";
    isValid = false;
  } else {
    titleError.style.display = "none";
  }

  submitPost.disabled = !isValid;
  return isValid;
}

// Handle image preview
function handleImagePreview(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.style.display = "none";
    previewImg.src = "";
  }
}

// Create new post
function createNewPost() {
  if (!validateForm()) return;

  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
    community: communitySelect.value,
    communityIcon: getCommunityIcon(communitySelect.value),
    title: postTitle.value,
    content: postContent.value,
    image: previewImg.src || "",
    timestamp: "Just now",
    likes: 0,
    liked: false,
    saved: false,
    canDelete: true // Make newly created posts deletable
  };

  posts.unshift(newPost);
  savePosts();
  renderPosts();
  hideModal();
}

// Get community icon based on community name
function getCommunityIcon(community) {
  const iconMap = {
    "r/SportsIndia": "mainIImages/bcci.svg",
    "r/memeIndia": "mainIImages/meme.jpg",
    "r/cplusplus": "mainIImages/c++.png",
    "r/English": "mainIImages/logoimage.jpg",
    "r/Pikachu": "mainIImages/pika.jpg",
  };

  return iconMap[community] || "mainIImages/logoimage.jpg";
}

// Event Listeners for create post
createPostBtn.addEventListener("click", showModal);
closeModal.addEventListener("click", hideModal);
cancelPost.addEventListener("click", hideModal);

// Close modal when clicking outside
createPostModal.addEventListener("click", function (e) {
  if (e.target === createPostModal) {
    hideModal();
  }
});

submitPost.addEventListener("click", createNewPost);

// Form validation on input
communitySelect.addEventListener("change", validateForm);
postTitle.addEventListener("input", validateForm);

// Image preview
postImage.addEventListener("change", handleImagePreview);

// Event listeners for delete functionality
cancelDelete.addEventListener("click", hideDeleteModal);
confirmDelete.addEventListener("click", deletePost);

// Close delete modal when clicking outside
deleteModal.addEventListener("click", function (e) {
  if (e.target === deleteModal) {
    hideDeleteModal();
  }
});

// Dark/Light mode toggle
document.addEventListener("DOMContentLoaded", function () {
  const nightModeToggle = document.querySelector(".nightMode");

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "light" || (!currentTheme && !prefersDarkScheme.matches)) {
    enableLightMode();
  } else {
    document.body.classList.remove("light-mode");
  }

  nightModeToggle.addEventListener("click", function () {
    if (document.body.classList.contains("light-mode")) {
      disableLightMode();
    } else {
      enableLightMode();
    }
  });

  function enableLightMode() {
    document.body.classList.add("light-mode");
    nightModeToggle.src = `sun.png`;
    nightModeToggle.style.filter = "invert(0.4)";
    localStorage.setItem("theme", "light");
  }

  function disableLightMode() {
    document.body.classList.remove("light-mode");
    nightModeToggle.src = `moon.png`;
    nightModeToggle.style.filter = "invert(0.8)";
    localStorage.setItem("theme", "dark");
  }

  // Initialize the page
  loadPosts();
});





// sewrch  ka hai 
// Add this to your existing JavaScript code

// Search functionality
const searchBox = document.querySelector('.searchBox');

// Function to filter posts based on search query
function filterPosts(searchTerm) {
    const filteredPosts = posts.filter(post => {
        const searchLower = searchTerm.toLowerCase();
        
        // Search in title, content, and community
        return post.title.toLowerCase().includes(searchLower) ||
               post.content.toLowerCase().includes(searchLower) ||
               post.community.toLowerCase().includes(searchLower);
    });
    
    return filteredPosts;
}

// Function to render filtered posts
function renderFilteredPosts(filteredPosts) {
    postsContainer.innerHTML = "";

    if (filteredPosts.length === 0) {
        // Show no results message
        const noResultsElement = document.createElement('div');
        noResultsElement.className = 'no-results';
        noResultsElement.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #818384;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 16px;"></i>
                <h3>No posts found</h3>
                <p>Try searching with different keywords</p>
            </div>
        `;
        postsContainer.appendChild(noResultsElement);
        return;
    }

    filteredPosts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post-container";
        postElement.innerHTML = `
            <div class="logo-text-div">
                <div class="left-side-div">
                    <img src="${post.communityIcon}" alt="${post.community}"> 
                    <h5>${post.community}</h5>
                    <p> <sup id="dot">.</sup>${post.timestamp}</p>
                </div>
                <div class="rightside-div">
                    <button class="join">Join</button>
                    ${post.canDelete ? `
                        <button class="delete-btn" data-id="${post.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    ` : ''}
                    <a href="#"><img src="mainIImages/more.png" alt="" class="more-ing"></a>
                </div>
            </div>
            <div class="desc-div">
                <p>${post.title}</p>
            </div>
            ${post.image ? `
                <div class="img-div-post">
                    <img src="${post.image}" alt="${post.title}">
                </div>
            ` : ""}
            <div class="like-unlike">
                <img src="${post.liked ? 'mainIImages/like-filled.png' : 'mainIImages/like.png'}" 
                     alt="Like" class="cursor likeBtns" data-id="${post.id}">
                <img src="mainIImages/commentPost.png" alt="Comment" class="cursor">
                <img src="${post.saved ? 'mainIImages/savePost-filled.png' : 'mainIImages/savePost.png'}" 
                     alt="Save" class="cursor savedd" data-id="${post.id}">
            </div>
            <div class="space">
                <hr>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });

    // Reattach event listeners
    attachEventListeners();
}

// Function to handle search input
function handleSearch() {
    const searchTerm = searchBox.value.trim();
    
    if (searchTerm === '') {
        // If search is empty, show all posts
        renderPosts();
    } else {
        // Filter and show matching posts
        const filteredPosts = filterPosts(searchTerm);
        renderFilteredPosts(filteredPosts);
    }
}

// Add event listener for search input
searchBox.addEventListener('input', handleSearch);

// Add event listener for Enter key in search box
searchBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Also add a search icon click handler
const searchIcon = document.querySelector('.seacrh_icon');
searchIcon.addEventListener('click', handleSearch);

// Update the attachEventListeners function to include search functionality
function attachEventListeners() {
    // Add event listeners for like and save buttons
    document.querySelectorAll(".likeBtns").forEach((btn) => {
        btn.addEventListener("click", function () {
            const postId = parseInt(this.getAttribute("data-id"));
            toggleLike(postId);
        });
    });

    document.querySelectorAll(".savedd").forEach((btn) => {
        btn.addEventListener("click", function () {
            const postId = parseInt(this.getAttribute("data-id"));
            toggleSave(postId);
        });
    });

    // Add event listeners for delete buttons
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            const postId = parseInt(this.getAttribute("data-id"));
            showDeleteModal(postId);
        });
    });
}

// Update the renderPosts function to use attachEventListeners
function renderPosts() {
    postsContainer.innerHTML = "";

    posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post-container";
        postElement.innerHTML = `
            <div class="logo-text-div">
                <div class="left-side-div">
                    <img src="${post.communityIcon}" alt="${post.community}"> 
                    <h5>${post.community}</h5>
                    <p> <sup id="dot">.</sup>${post.timestamp}</p>
                </div>
                <div class="rightside-div">
                    <button class="join">Join</button>
                    ${post.canDelete ? `
                        <button class="delete-btn" data-id="${post.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    ` : ''}
                    <a href="#"><img src="mainIImages/more.png" alt="" class="more-ing"></a>
                </div>
            </div>
            <div class="desc-div">
                <p>${post.title}</p>
            </div>
            ${post.image ? `
                <div class="img-div-post">
                    <img src="${post.image}" alt="${post.title}">
                </div>
            ` : ""}
            <div class="like-unlike">
                <img src="${post.liked ? 'mainIImages/like-filled.png' : 'mainIImages/like.png'}" 
                     alt="Like" class="cursor likeBtns" data-id="${post.id}">
                <img src="mainIImages/commentPost.png" alt="Comment" class="cursor">
                <img src="${post.saved ? 'mainIImages/savePost-filled.png' : 'mainIImages/savePost.png'}" 
                     alt="Save" class="cursor savedd" data-id="${post.id}">
            </div>
            <div class="space">
                <hr>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });

    attachEventListeners();
}

// Add CSS for no results message
const style = document.createElement('style');
style.textContent = `
    .no-results {
        background-color: #1a1a1b;
        border-radius: 8px;
        border: 1px solid #343536;
        margin: 20px 0;
        padding: 40px;
        text-align: center;
    }
    
    .light-mode .no-results {
        background-color: var(--bg-primary);
        border-color: var(--border-color);
        color: var(--text-primary);
    }
    
    .no-results i {
        font-size: 3rem;
        margin-bottom: 16px;
        color: #818384;
    }
    
    .no-results h3 {
        color: #d7dadc;
        margin-bottom: 8px;
    }
    
    .light-mode .no-results h3 {
        color: var(--text-primary);
    }
    
    .no-results p {
        color: #818384;
    }
    
    .light-mode .no-results p {
        color: var(--text-secondary);
    }
`;
document.head.appendChild(style);
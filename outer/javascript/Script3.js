// Add this at the top of your script - define samplePosts
const samplePosts = [
    {
        community: "r/SportsIndia",
        communityIcon: "mainIImages/bcci.svg",
        title: "India wins the world cup!",
        content: "Amazing performance by the team",
        image: null,
        timeAgo: "2 hours ago"
    },
    {
        community: "r/Pikachu",
        communityIcon: "mainIImages/pika.jpg",
        title: "New Pikachu evolution discovered",
        content: "Check out this amazing discovery",
        image: null,
        timeAgo: "5 hours ago"
    },
    {
        community: "r/memeIndia",
        communityIcon: "mainIImages/meme.jpg",
        title: "Funny memes of the week",
        content: "Here are the best memes",
        image: null,
        timeAgo: "1 day ago"
    }
];

// Add NotificationManager class (simplified version)
class NotificationManager {
    constructor() {
        this.notificationCount = 0;
    }

    addNotification(type, message, title) {
        this.notificationCount++;
        console.log(`Notification: ${message} - ${title}`);
        // You can implement actual notification UI here
    }
}

// Search Manager Class
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
        this.allPosts = JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;
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
        resultsInfo.textContent = `${posts.length} result${posts.length !== 1 ? "s" : ""} found for "${searchTerm}"`;
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
                <p>${highlightedTitle}</p>
            </div>
            ${post.image ? `
            <div class="img-div-post">
                <img src="${post.image}" alt="Post image">
            </div>
            ` : ""}
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
            const savedPosts = JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;
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

// Post Management Functions
function deletePost(postIndex) {
    if (confirm("Are you sure you want to delete this post?")) {
        const savedPosts = JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;
        const deletedPost = savedPosts[postIndex];

        savedPosts.splice(postIndex, 1);
        localStorage.setItem("reddixPosts", JSON.stringify(savedPosts));
        initializePosts();

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

function initializePosts() {
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";
    const savedPosts = JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;

    savedPosts.forEach((post, index) => {
        createPostElement(post, index);
    });
}

function createPostElement(post, index) {
    const postsContainer = document.getElementById("postsContainer");
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
        ${post.image ? `
        <div class="img-div-post">
            <img src="${post.image}" alt="Post image">
        </div>
        ` : ""}
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

    // Add event listeners
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
    // Initialize posts first
    initializePosts();
    
    // Then initialize managers
    notificationManager = new NotificationManager();
    searchManager = new SearchManager();
    
    // Your existing modal functionality
    const createPostBtn = document.getElementById("createPostBtn");
    const createPostModal = document.getElementById("createPostModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const cancelPostBtn = document.getElementById("cancelPostBtn");
    const submitPostBtn = document.getElementById("submitPostBtn");

    function openModal() {
        createPostModal.classList.remove("hidden");
    }

    function closeModal() {
        createPostModal.classList.add("hidden");
        // Clear form
        document.getElementById("postTitle").value = "";
        document.getElementById("postContent").value = "";
        document.getElementById("postImage").value = "";
    }

    createPostBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal);
    cancelPostBtn.addEventListener("click", closeModal);

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
        else if (community === "r/English") communityIcon = "mainIImages/logoimage.jpg";

        const newPost = {
            community: community,
            communityIcon: communityIcon,
            title: title,
            content: content,
            image: imageUrl || null,
            timeAgo: "Just now",
        };

        const existingPosts = JSON.parse(localStorage.getItem("reddixPosts")) || samplePosts;
        existingPosts.unshift(newPost);
        localStorage.setItem("reddixPosts", JSON.stringify(existingPosts));

        initializePosts();
        closeModal();

        // Add notification
        notificationManager.addNotification(
            "create",
            "Your post has been published successfully",
            title
        );
    });

    // Close modal when clicking outside
    createPostModal.addEventListener("click", function (e) {
        if (e.target === createPostModal) {
            closeModal();
        }
    });
});



// mode switch hoo raha hai yaha pe 
const modeSwitch = document.querySelector(".nightMode");

document.addEventListener('DOMContentLoaded', function() {
  const nightModeToggle = document.querySelector('.nightMode');
  
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'light' || (!currentTheme && !prefersDarkScheme.matches)) {
    enableLightMode();
  } else {
    document.body.classList.remove('light-mode');
  }
  
  nightModeToggle.addEventListener('click', function() {
    if (document.body.classList.contains('light-mode')) {
      disableLightMode();
    } else {
      enableLightMode();
    }
  });
  
  function enableLightMode() {
    document.body.classList.add('light-mode');

    nightModeToggle.src = `sun.png`;
    nightModeToggle.style.filter = 'invert(0.4)';
    localStorage.setItem('theme', 'light');
  }
  
  function disableLightMode() {
    document.body.classList.remove('light-mode');
    nightModeToggle.src = `moon.png`;
    nightModeToggle.style.filter = 'invert(0.8)'; 
    localStorage.setItem('theme', 'dark');
  }
});







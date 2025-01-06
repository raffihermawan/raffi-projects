document.addEventListener("DOMContentLoaded", function () {
    // Simulate data fetching for posts, comments, and visitors
    const data = {
        posts: 3,
        comments: 10,
        visitors: 256,
        postsList: [
            { title: "First Post", content: "This is the first post" },
            { title: "Second Post", content: "This is the second post" },
            { title: "Third Post", content: "This is the third post" }
        ],
        commentsList: [
            { author: "Alice", content: "Great post!" },
            { author: "Bob", content: "Very informative." }
        ]
    };
  
    // Set dashboard counts
    document.getElementById("postsCount").textContent = data.posts;
    document.getElementById("commentsCount").textContent = data.comments;
    document.getElementById("visitorsCount").textContent = data.visitors;
  
    // Display posts
    const postList = document.getElementById("postList");
    
    function displayPosts() {
        postList.innerHTML = "";
        data.postsList.forEach((post, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span id="postTitle${index}">${post.title}</span>
                <input type="text" id="editTitle${index}" value="${post.title}" style="display:none;">
                <button onclick="deletePost(${index})">Delete</button>
                <button onclick="editPost(${index})" id="editButton${index}">Edit</button>
                <button onclick="savePost(${index})" id="saveButton${index}" style="display:none;">Save</button>
            `;
            postList.appendChild(li);
        });
    }
    
    displayPosts();
  
    // Add new post
    const addPostForm = document.getElementById("addPostForm");
    addPostForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const newTitle = document.getElementById("postTitle").value;
        const newContent = document.getElementById("postContent").value;
  
        data.postsList.push({ title: newTitle, content: newContent });
        data.posts++;
        document.getElementById("postsCount").textContent = data.posts;
        displayPosts();
  
        // Clear input fields
        document.getElementById("postTitle").value = "";
        document.getElementById("postContent").value = "";
    });
  
    // Delete post function
    window.deletePost = function(index) {
        data.postsList.splice(index, 1); // Remove the post from the array
        data.posts--; // Decrement the post count
        document.getElementById("postsCount").textContent = data.posts; // Update post count in the dashboard
        displayPosts(); // Re-display the updated list of posts
    }
  
    // Edit post function
    window.editPost = function(index) {
        const titleSpan = document.getElementById(`postTitle${index}`);
        const titleInput = document.getElementById(`editTitle${index}`);
        const editButton = document.getElementById(`editButton${index}`);
        const saveButton = document.getElementById(`saveButton${index}`);
  
        // Show the input field and save button
        titleSpan.style.display = "none";
        titleInput.style.display = "block";
        editButton.style.display = "none";
        saveButton.style.display = "block";
    }
  
    // Save edited post function
    window.savePost = function(index) {
        const titleInput = document.getElementById(`editTitle${index}`);
        const newTitle = titleInput.value;
  
        // Update the post title in the data array
        data.postsList[index].title = newTitle;
  
        // Hide the input field and save button, show the updated title and edit button
        document.getElementById(`postTitle${index}`).textContent = newTitle;
        document.getElementById(`postTitle${index}`).style.display = "block";
        titleInput.style.display = "none";
        document.getElementById(`editButton${index}`).style.display = "block";
        document.getElementById(`saveButton${index}`).style.display = "none";
  
        displayPosts(); // Refresh the post list to show updated values
    }
  });
  
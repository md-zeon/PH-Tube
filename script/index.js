function loadCategories() {
	// Fetch The Data
	fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
		// Convert Promise to json
		.then((res) => res.json())
		// Send data to display
		.then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
	// get the container
	const categoryContainer = document.getElementById("category-container");
	// Loop operation on array of objects
	for (const category of categories) {
		// Create Element
		const categoryDiv = document.createElement("div");
		categoryDiv.innerHTML = `
            <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
		// Add Element
		categoryContainer.appendChild(categoryDiv);
	}
}

loadCategories();

function loadVideos() {
	fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
		.then((res) => res.json())
		.then((data) => displayVideos(data.videos));
}

const displayVideos = (videos) => {
	// console.log(videos);
    const videoContainer = document.getElementById("video-container");

    videos.forEach(video => {
        // console.log(video);
        const videoCard = document.createElement("div");

        videoCard.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="${video.title}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        `;

        videoContainer.append(videoCard);
    });
}

loadVideos();
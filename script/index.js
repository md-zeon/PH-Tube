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

	videos.forEach((video) => {
		// console.log(video);
		const videoCard = document.createElement("div");

		videoCard.innerHTML = `
            <div class="card bg-base-100">
                <figure class="relative">
                    <img class="w-full h-36 object-cover" src="${video.thumbnail}" alt="${video.title}" />
                    <span class="absolute bottom-2 right-2 text-white bg-black/90 px-2 pb-1 text-sm rounded">3hrs 56 min
                        ago</span>
                </figure>
                <div class="flex gap-3 px-0 py-5">
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div class="intro">
                        <h2 class="text-sm font-semibold">Shape of You</h2>
                        <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} ${(video.authors[0].verified) ? `<img class="w-5 h-5"
                          src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="Verified">` : ""}</p>
                        <p class="text-sm text-gray-400">${video.others.views} Views</p>
                    </div>
                </div>
            </div>
        `;

		videoContainer.append(videoCard);
	});
};



function loadCategories() {
	// Fetch The Data
	fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
		// Convert Promise to json
		.then((res) => res.json())
		// Send data to display
		.then((data) => displayCategories(data.categories));
}

function removeActiveClass() {
	const activeBtns = document.getElementsByClassName("active");
	for (let btn of activeBtns) {
		btn.classList.remove("active");
	}
}

const loadCategoryVideos = (id) => {
	fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
		.then((res) => res.json())
		.then((data) => {
			removeActiveClass();
			const clickedBtn = document.getElementById(`btn-${id}`);
			displayVideos(data.category);
			clickedBtn.classList.add("active");
		});
};

function displayCategories(categories) {
	// get the container
	const categoryContainer = document.getElementById("category-container");
	// Loop operation on array of objects
	for (const category of categories) {
		// Create Element
		const categoryDiv = document.createElement("div");
		categoryDiv.innerHTML = `
            <button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
		// Add Element
		categoryContainer.appendChild(categoryDiv);
	}
}


function loadVideos(searchText = "") {
	fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
		.then((res) => res.json())
		.then((data) => {
			removeActiveClass();
			document.getElementById("btn-all").classList.add("active");
			displayVideos(data.videos);
		});
}

const loadVideoDetails = (videoId) => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`,
	)
  .then((res) => res.json())
		.then((data) => displayVideoDetails(data.video));
};

const displayVideoDetails = (video) => {
	document.getElementById("video_details").showModal();
	const detailsContainer = document.getElementById("details-container");
  
	detailsContainer.innerHTML = `
      <div class="card bg-base-100 image-full shadow-sm">
        <figure>
          <img
          src="${video.thumbnail}"
            alt="${video.title}" />
            </figure>
            <div class="card-body">
            <h2 class="card-title">${video.title}</h2>
            <p>${video.description}</p>
            </div>
            </div>
            `;
          };
          
          const displayVideos = (videos) => {
            // console.log(videos);
            const videoContainer = document.getElementById("video-container");
	videoContainer.innerHTML = "";
  
	if (videos.length === 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full text-center place-items-center mt-20 space-y-4">
    <img class="mx-auto" src="Icon.png" alt="Icon">
    <h2 class="text-2xl font-bold">Opps!! Sorry, There is no content here</h2>
            </div>
    `;
		return;
	}
  
	videos.forEach((video) => {
    // console.log(video);
		const videoCard = document.createElement("div");
    
		videoCard.innerHTML = `
            <div class="card bg-base-100">
            <figure class="relative">
            <img class="w-full h-36 object-cover" src="${
              video.thumbnail
					}" alt="${video.title}" />
          <span class="absolute bottom-2 right-2 text-white bg-black/90 px-2 pb-1 text-sm rounded">3hrs 56 min
                        ago</span>
                </figure>
                <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                        <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                                <img src="${
									video.authors[0].profile_picture
								}" />
                            </div>
                        </div>
                    </div>
                    <div class="intro">
                    <h2 class="text-sm font-semibold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1">${
							video.authors[0].profile_name
						} ${
			video.authors[0].verified
				? `<img class="w-5 h-5"
                          src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="Verified">`
				: ""
		}</p>
                        <p class="text-sm text-gray-400">${
							video.others.views
						} Views</p>
            </div>
                </div>
                <button onclick="loadVideoDetails('${
					video.video_id
				}')" class="btn btn-block hover:bg-[#FF1F3D] hover:text-white">Show Details</button>
        </div>
        `;
        
		videoContainer.append(videoCard);
	});
};

loadCategories();


document.getElementById("search-input").addEventListener("keyup", (e) => {
  const input = e.target.value;
  loadVideos(input);
})
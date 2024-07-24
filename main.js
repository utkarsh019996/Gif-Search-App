const submitBtn = document.getElementById("submit-btn");

const generateGif = async () => {
  const loader = document.querySelector(".loader");
  const wrapper = document.querySelector(".wrapper");
  const searchBox = document.getElementById("search-box");
  const apiKey = "Ha2tZELKxEKWRVojVkK5hcaO531uB6WZ";
  let gifCount = 12;

  // Show loader and hide wrapper
  loader.style.display = "block";
  wrapper.style.display = "none";

  // Get search value or use default "laugh"
  const q = searchBox.value || "laugh";

  // API URL
  const finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;

  try {
    const response = await fetch(finalURL);
    const info = await response.json();
    const gifsData = info.data;

    // Clear previous results
    wrapper.innerHTML = "";

    // Generate and display GIFs
    gifsData.forEach((gif) => {
      const container = document.createElement("div");
      container.classList.add("container");

      const img = document.createElement("img");
      img.src = gif.images.downsized_medium.url;
      img.onload = () => {
        if (--gifCount === 0) {
          loader.style.display = "none";
          wrapper.style.display = "grid";
        }
      };
      container.appendChild(img);

      // Copy link button
      const copyBtn = document.createElement("button");
      copyBtn.innerText = "Copy Link";
      copyBtn.onclick = async () => {
        const copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
        try {
          await navigator.clipboard.writeText(copyLink);
          alert("GIF copied to clipboard");
        } catch {
          alert("GIF copied to clipboard");
          const hiddenInput = document.createElement("input");
          hiddenInput.value = copyLink;
          document.body.appendChild(hiddenInput);
          hiddenInput.select();
          document.execCommand("copy");
          document.body.removeChild(hiddenInput);
        }
      };
      container.appendChild(copyBtn);

      wrapper.appendChild(container);
    });
  } catch (error) {
    console.error("Error fetching GIFs:", error);
  }
};

// Generate GIFs on screen load or when user clicks submit
submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);

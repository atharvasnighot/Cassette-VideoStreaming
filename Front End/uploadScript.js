const usernameEndpoint = "http://localhost:8080/home/current";
const token = localStorage.getItem("jwtToken");

document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("upload-form");

  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const videoName = document.getElementById("video-name").value;
    const videoDescription = document.getElementById("video-description").value;
    const videoFile = document.getElementById("video-upload").files[0];
    const thumbnailFile = document.getElementById("thumbnail-upload").files[0];

    // Fetch the username asynchronously
    const username = await fetchUsername();

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("image", thumbnailFile);

    const videoDetailData = {
      videoName: videoName,
      description: videoDescription,
      uploader: username, // Now it can be used here
    };

    try {
      const detailsResponse = await fetch(`http://localhost:8080/upload/videoDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(videoDetailData),
      });
      if (!detailsResponse.ok) {
        throw Error("Failed to upload Details");
      }

      // Upload video thumbnail
      const thumbnailResponse = await fetch(
        `http://localhost:8080/upload/thumbnail/${videoName}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!thumbnailResponse.ok) {
        throw Error("Failed to upload thumbnail");
      }

      // Upload video file
      const videoResponse = await fetch(
        `http://localhost:8080/upload/video/${videoName}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!videoResponse.ok) {
        throw new Error("Failed to upload video");
      }

      alert("Video uploaded successfully!");
      window.location.href = "home.html";
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again later.");
    }
  });
});

async function fetchUsername() {
  try {
    const response = await fetch(usernameEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data.username);
    let name = data.username;
    return name;
  } catch (error) {
    console.error("Error fetching username:", error);
    return "Guest";
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
      console.error('Service Worker registration failed:', error);
    });
}
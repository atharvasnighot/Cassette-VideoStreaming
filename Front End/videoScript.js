const otherVideosEndpoint = 'http://localhost:8080/otherVideos';
const videoDetailsEndpoint = "http://localhost:8080/video/details" 
const videoEndpoint = 'http://localhost:8080/video'; 
const thumbnailEndpoint = 'http://localhost:8080/thumbnail'; 
const token = localStorage.getItem("jwtToken"); 

async function fetchRecommendedVideos(title) {
    try {
        const response = await fetch(`${otherVideosEndpoint}/${title}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recommended videos:', error);
        return [];
    }
}

async function fetchVideoDetailsByTitle(title) {
    try {
        const response = await fetch(`${videoDetailsEndpoint}/${title}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching video details:', error);
        return null;
    }
}

async function populateRecommendedVideos(title) {
    const recommendedVideosList = document.getElementById('recommended-videos-list');

    const recommendedVideos = await fetchRecommendedVideos(title);

    recommendedVideos.forEach(async (video) => {
        const listItem = document.createElement('li');
        listItem.classList.add('recommended-video');

        const thumbnailImage = document.createElement('img');
        thumbnailImage.src = `${thumbnailEndpoint}/${video.videoName}`;
        thumbnailImage.alt = video.videoName;
        thumbnailImage.height = 300;
        thumbnailImage.width = 500;

        thumbnailImage.addEventListener('click', async () => {
            const videoDetails = await fetchVideoDetailsByTitle(video.videoName);
            if (videoDetails) {
                loadVideoAndDetails(videoDetails);
            }
        });

        const videoTitle = document.createElement('p');
        videoTitle.textContent = video.videoName;

        listItem.appendChild(thumbnailImage);
        listItem.appendChild(videoTitle);

        recommendedVideosList.appendChild(listItem);
    });
}

async function loadVideoAndDetails(videoDetails) {
    const videoPlayer = document.getElementById('video-player');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');

    videoPlayer.src = `${videoEndpoint}/${videoDetails.videoName}`;

    videoTitle.textContent = videoDetails.videoName;
    videoDescription.textContent = videoDetails.description;                  

    videoPlayer.play();
}

const params = new URLSearchParams(window.location.search);
const videoName = params.get('videoName');
if (videoName) {
    fetchVideoDetailsByTitle(videoName).then((videoDetails) => {
        if (videoDetails) {
            loadVideoAndDetails(videoDetails);
        }
    });
}

populateRecommendedVideos(videoName);

// const likeIcon = document.getElementById('like-icon');
// const dislikeIcon = document.getElementById('dislike-icon');
// const likeCount = document.getElementById('like-count');
// const dislikeCount = document.getElementById('dislike-count');

// let liked = false;
// let disliked = false;

// likeIcon.addEventListener('click', async () => {
//     if (!liked) {
//         liked = true;
//         dislikeIcon.style.color = ''; 
//         likeIcon.style.color = 'blue'; 
//         const videoName = document.getElementById('video-title').textContent;      // Increment like count on the server and update the count on the page
//         await incrementLikeCount(videoName);
//         likeCount.textContent = parseInt(likeCount.textContent) + 1;
//     } else {
//         liked = false;
//         likeIcon.style.color = ''; 
//     }
// });

// dislikeIcon.addEventListener('click', async () => {
//     if (!disliked) {
//         disliked = true;
//         likeIcon.style.color = ''; 
//         dislikeIcon.style.color = 'red'; 
//         const videoName = document.getElementById('video-title').textContent;
//         // Increment dislike count on the server and update the count on the page
//         await incrementDislikeCount(videoName);
//         dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
//     } else {
//         disliked = false;
//         dislikeIcon.style.color = ''; 
//     }
// });

// async function incrementLikeCount(videoName) {
//     try {
//         console.log("like++");
//         await fetch(`http://localhost:8080/video/putLikes/${videoName}`, {
//             method: "PUT",
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });
//     } catch (error) {
//         console.error('Error incrementing like count:', error);
//     }
// }

// async function incrementDislikeCount(videoName) {
//     try {
//         await fetch(`http://localhost:8080/video/putDislikes/${videoName}`, {
//             method: "PUT",
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });
//     } catch (error) {
//         console.error('Error incrementing dislike count:', error);
//     }
// }



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
}
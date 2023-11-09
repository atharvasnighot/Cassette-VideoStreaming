const allVideosEndpoint =  "http://localhost:8080/allVideos";  
const thumbnailEndpoint = "http://localhost:8080/thumbnail" ;
const usernameEndpoint = "http://localhost:8080/home/current";
const token = localStorage.getItem("jwtToken");

async function fetchVideoData() {
    try {
        const response = await fetch(allVideosEndpoint, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching video data:', error);
        return [];
    }
}

function handleThumbnailClick(videoId, videoName) {
    window.location.href = `video.html?videoId=${videoId}&videoName=${encodeURIComponent(videoName)}`;
}

async function fetchUsername() {
    try {
        const response = await fetch(usernameEndpoint, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.username; 
    } catch (error) {
        console.error('Error fetching username:', error);
        return 'Guest'; 
    }
}

async function populateUserProfile() {
    const userCircle = document.querySelector('.user-circle');
    const usernameElement = document.querySelector('.user-username');
    const username = await fetchUsername();

    usernameElement.textContent = username;
}

async function populateVideoFeed() {
    const videoList = document.querySelector('.video-list');

    const videoData = await fetchVideoData();

    videoData.forEach(async (video) => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        const thumbnail = document.createElement('div');
        thumbnail.classList.add('video-thumbnail');

        const thumbnailImage = document.createElement('img');

        thumbnailImage.src = `${thumbnailEndpoint}/${video.videoName}`;
        thumbnailImage.alt = video.videoName;

        thumbnailImage.width = 500; 
        thumbnailImage.height = 280; 

        thumbnailImage.addEventListener('click', () => {
            handleThumbnailClick(video.videoId, video.videoName);
        });

        thumbnail.appendChild(thumbnailImage);

        const title = document.createElement('div');
        title.classList.add('video-title');
        title.textContent = video.videoName;

        videoItem.appendChild(thumbnail);
        videoItem.appendChild(title);
        videoList.appendChild(videoItem);
    });
}

async function checkAuthentication() {
    const username = await fetchUsername();
    const uploadIcon = document.querySelector('.nav-icon');
    const loginMessage = document.querySelector('.login-message');

    if (username === undefined) {
        uploadIcon.style.display = 'block';
    } else {
        uploadIcon.style.display = 'block';
    }

    uploadIcon.addEventListener('click', function (event) {
        event.preventDefault(); 
        if (username === undefined) {
            loginMessage.style.display = 'block';
        } else {
            window.location.href = 'uploadPage.html';
        }
    });
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

checkAuthentication();
populateVideoFeed();
populateUserProfile();
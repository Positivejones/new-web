
 let lastVideo = "";
        function changeVideo() {
            const video = document.getElementById("video1");
            const input = document.getElementById("me").value;
            if (input) {
                videoLinks.push(input);
                saveLinks();
                updateVideo(input);
            }
        }

        function updateVideo(link) {
            const video = document.getElementById("video1");
            const sources = video.getElementsByTagName('source');
            sources[0].src = link + ".mp4";
            sources[1].src = link + ".ogg";
            video.load();
            document.getElementById("message").innerText = "Video source changed to: " + link;
        }

        function recallVideo() {
            if (videoLinks.length > 0) {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * videoLinks.length);
                } while (videoLinks[randomIndex] === lastVideo);
                lastVideo = videoLinks[randomIndex];
                updateVideo(lastVideo);
            } else {
                document.getElementById("message").innerText = "No video links stored.";
            }
        }

        function saveLinks() {
            const json = JSON.stringify(videoLinks);
            localStorage.setItem('videoLinks', json);
        }

        function loadLinks() {
            const json = localStorage.getItem('videoLinks');
            if (json) {
                videoLinks = JSON.parse(json);
            }
        }

        window.onload = loadLinks;

        var meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=1280,initial-scale="+window.innerWidth/1280;
        document.getElementsByTagName('head')[0].appendChild(meta);

        document.addEventListener('DOMContentLoaded', function() {
            const audio = document.getElementById("music");

            function toggleMusic() {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            }

            function increaseVolume() {
                if (audio.volume < 1) {
                    audio.volume += 0.2;
                    audio.volume = Math.min(1, audio.volume); // Ensure volume doesn't exceed 1
                }
            }

            function decreaseVolume() {
                if (audio.volume > 0) {
                    audio.volume -= 0.2;
                    audio.volume = Math.max(0, audio.volume); // Ensure volume doesn't go below 0
                }
            }

            // Assign the functions to the window object to make them accessible from HTML
            window.toggleMusic = toggleMusic;
            window.increaseVolume = increaseVolume;
            window.decreaseVolume = decreaseVolume;

            audio.play().catch(error => {
                console.log('Autoplay was prevented. Showing play button.');
            });
        });
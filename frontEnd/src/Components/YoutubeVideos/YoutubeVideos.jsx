import React, { useEffect, useState } from 'react'
// import './YouTubeVideos.css'
function Youtube() {
    const [YouTubeVideo, setYouTubeVideo]= useState([]);


// useEffect(() => {
//   fetch(
//     https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=9&order=date&key=AIzaSyDOKE4iOmtTbvkT2Oq1x7VbFqB5GU6_V7g
//   )
//       .then((res) => res.json())
//       .then((data) => {
//     const YouTubeVideoData = data.items;
//     setYouTubeVideo(YouTubeVideoData);
//   })
// },[])

    useEffect(() => {
      async function getVideos(){
      
        const response = await fetch(
               `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=9&key=AIzaSyDpRpj612toRPBdHJ_lfz3sMVDlT_UpzRg`
             );
             const data = await response.json()
            //  console.log(data)
            setYouTubeVideo(data.items)
      }
      getVideos();
    }, [])

    console.log(YouTubeVideo)

  return (
    <div className="allVideosWrapper">
      <div className="container">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-12">
            <div className="title-wraper bold video-title-wrapper">
              Latest Videos
            </div>
          </div>
          {YouTubeVideo.map((singleVideo, i) => {
            let vidId = singleVideo.id.videoId;
            let vidLink = `https://www.youtube.com/watch?v=${vidId}`;
            return (
              <div key={i} className="col-sm-12 col-md-4">
                <div className="singleVideoWrapper">
                  <div className="videoThumbnail">
                    <a href={vidLink} target="_blank" rel="noopener noreferrer">
                      <img
                        src={singleVideo.snippet.thumbnails.high.url}
                        alt={singleVideo.snippet.title}
                      />
                    </a>
                  </div>
                  <div className="videoInfoWrapper">
                    <div className="videoTitle">
                      <a href={vidLink} target="_blank" rel="noopener noreferrer">
                        {singleVideo.snippet.title}
                      </a>
                    </div>
                    <div className="videoDesc">
                      {singleVideo.snippet.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
   
  

export default Youtube;
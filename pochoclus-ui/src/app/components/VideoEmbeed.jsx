function getEmbedUrl(videoUrl) {
    let videoId = videoUrl.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  export default function VideoEmbeed({ videoUrl }) {
    const embedUrl = getEmbedUrl(videoUrl);
  
    return (
      <div>
        <iframe
          width="1120"
          height="630"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
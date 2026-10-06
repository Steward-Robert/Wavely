import { Image, Video, SendHorizonal, X } from "lucide-react";
import { useRef, useState } from "react";
import api from "../../services/api.js";

function ShareSM({ user, onStoryUploaded }) {
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const inputImage = useRef(null);
  const inputVideo = useRef(null);

  const addImageFiles = (e) => {
    const imageSelected = Array.from(e.target.files);
    setImage(imageSelected);
    e.target.value = "";
  };

  const addVideoFiles = (e) => {
    const videoSelected = Array.from(e.target.files);
    setVideo(videoSelected);
    e.target.value = "";
  };

  const handleImages = () => {
    inputImage.current.click();
  };

  const handleVideos = () => {
    inputVideo.current.click();
  };

  const removeImage = (indexToRemove) => {
    setImage((files) => files.filter((_, index) => index !== indexToRemove));
  };

  const removeVideo = (indexToRemove) => {
    setVideo((files) => files.filter((_, index) => index !== indexToRemove));
  };

  const showVideoPreview = (event) => {
    const preview = event.currentTarget;
    if (Number.isFinite(preview.duration) && preview.duration > 0) {
      preview.currentTime = Math.min(0.1, preview.duration / 2);
    }
  };

  const uploadStory = async () => {
    const files = [...image, ...video];
    if (files.length === 0) {
      setIsError(true);
      setMessage("Select at least one image or video for your story.");
      return;
    }
    if (files.length > 9) {
      setIsError(true);
      setMessage("You can upload up to 9 story files at a time.");
      return;
    }

    setIsUploading(true);
    setMessage("");
    setIsError(false);
    const formData = new FormData();
    formData.append("content", content);
    files.forEach((file) => formData.append("image", file));

    try {
      await api.post("/story", formData);
      setImage([]);
      setVideo([]);
      setContent("");
      setMessage("Story uploaded successfully.");
      onStoryUploaded?.();
    } catch (error) {
      console.error("Error uploading story:", error);
      setIsError(true);
      setMessage(
        error.response?.data?.message ||
          "Could not upload your story. Please try again.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div id="share-sm" className="mx-2 mt-10 w-[95vw] mx-auto block overflow-hidden rounded-[30px] border border-white/10 bg-[#05070b]/90 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)] sm:p-5 md:w-xl md:block md:mx-auto sm:w-[80vw] sm:block sm:mx-auto lg:w-[45vw]">
      <div className="flex items-center gap-1 rounded-2xl border border-white/5 bg-white/[0.02] px-2 py-2">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-lg shadow-black/20">
          <img
            src={
              user?.avatar?.avatar ??
              user?.avatars?.at(-1)?.avatar ??
              "/pfp ideas 🌑.jpg"
            }
            alt="profile"
            className="h-full w-full rounded-full object-cover object-center"
          />
        </div>
        <input
          readOnly
          type="text"
          placeholder="Share something special"
          className="w-full border-none bg-transparent text-base text-amber-50 placeholder:text-gray-400 outline-none"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputImage}
        onChange={addImageFiles}
        className="hidden"
      />

      <input
        type="file"
        accept="video/*"
        multiple
        ref={inputVideo}
        onChange={addVideoFiles}
        className="hidden"
      />

      <textarea
        placeholder="Tell us everything..."
        maxLength={180}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="mt-9 h-20 w-[70vw] mx-auto block resize-none rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-3 text-amber-50 placeholder:text-gray-400 focus:outline-none scrollbar-none"
      />

      {message && (
        <p
          role={isError ? "alert" : "status"}
          className={`mt-3 text-sm ${isError ? "text-rose-200" : "text-emerald-200"}`}
        >
          {message}
        </p>
      )}

      {(image.length > 0 || video.length > 0) && (
        <div className="my-4 max-h-72 overflow-auto rounded-2xl border border-white/10 bg-black/10 p-3">
          {/* IMAGES */}
          <div className="flex flex-wrap gap-3">
            {image.map((image, index) => (
              <div key={index} className="group relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="h-34 w-35 rounded-xl object-cover ring-1 ring-white/15"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label={`Remove ${image.name}`}
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition hover:bg-rose-500/80"
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>

          {/* VIDEOS */}
          <div className="mt-3 flex flex-wrap gap-3">
            {video.map((video, index) => (
              <div key={index} className="group relative">
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  preload="metadata"
                  onLoadedMetadata={showVideoPreview}
                  className="h-40 w-72 max-w-full rounded-xl object-cover ring-1 ring-white/15"
                />
                <button
                  type="button"
                  onClick={() => removeVideo(index)}
                  aria-label={`Remove ${video.name}`}
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition hover:bg-rose-500/80"
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between gap-2.5">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleImages}
            aria-label="Add story images"
            disabled={isUploading}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-white/10 hover:text-amber-100"
          >
            <Image className="cursor-pointer" size={18} color="currentColor" />
          </button>

          <button
            type="button"
            onClick={handleVideos}
            aria-label="Add story videos"
            disabled={isUploading}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-white/10 hover:text-amber-100"
          >
            <Video className="cursor-pointer" size={18} color="currentColor" />
          </button>
        </div>

        <button
          type="button"
          onClick={uploadStory}
          aria-label={isUploading ? "Uploading story" : "Upload story"}
          aria-busy={isUploading}
          disabled={isUploading}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-400/15 hover:text-emerald-100"
        >
          {isUploading ? (
            <span className="text-xs" aria-hidden="true">...</span>
          ) : (
            <SendHorizonal size={18} color="currentColor" />
          )}
        </button>
      </div>
    </div>
  );
}

export default ShareSM;

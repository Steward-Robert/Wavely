import api from "../../services/api.js";
import { Image, Video, X } from "lucide-react";
import { useRef, useState } from "react";
import Loader from "../loader.jsx";

function PostField() {
  const videoInput = useRef(null);
  const imageInput = useRef(null);

  const [imgFiles, setImgFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleImgFiles = (e) => {
    const selectImage = Array.from(e.target.files);
    setImgFiles(selectImage);
  };

  const uploadPost = async () => {
    if (!text.trim() && imgFiles.length === 0 && videoFiles.length === 0) {
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("content", text);

    imgFiles.forEach((file) => {
      formData.append("image", file);
    });

    videoFiles.forEach((file) => {
      formData.append("video", file);
    });

    try {
      const response = await api.post("/post", formData, {
        withCredentials: true,
      });

      console.log(response.data);

      // Nettoyer après succès
      setText("");
      setImgFiles([]);
      setVideoFiles([]);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVideo = (e) => {
    const selectVideo = Array.from(e.target.files);
    setVideoFiles(selectVideo);
  };

  const handleClick = () => {
    videoInput.current.click();
  };

  const handleClickImg = () => {
    imageInput.current.click();
  };

  const removeImage = (indexToRemove) => {
    setImgFiles((files) => files.filter((_, index) => index !== indexToRemove));
  };

  const removeVideo = (indexToRemove) => {
    setVideoFiles((files) =>
      files.filter((_, index) => index !== indexToRemove),
    );
  };

  const showVideoPreview = (event) => {
    const preview = event.currentTarget;
    if (Number.isFinite(preview.duration) && preview.duration > 0) {
      preview.currentTime = Math.min(0.1, preview.duration / 2);
    }
  };

  return (
    <div className="px-7 pb-7">
      {loading && <Loader />}
      <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Create a new post
        </h2>
      </div>
      <div>
        <textarea
          placeholder="What's going on today?"
          value={text}
          className="min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-base text-white outline-none placeholder:text-white/35 transition focus:border-amber-200/45 focus:bg-black/15"
          onChange={handleText}
        />

        {/* IMAGE INPUT */}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={imageInput}
          onChange={handleImgFiles}
        />

        {/* VIDEO INPUT */}
        <input
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          ref={videoInput}
          onChange={handleVideo}
        />

        {/* PREVIEW */}
        {(imgFiles.length > 0 || videoFiles.length > 0) && (
          <div className="my-4 max-h-72 overflow-auto rounded-2xl border border-white/10 bg-black/10 p-3">
            {/* IMAGES */}
            <div className="flex flex-wrap gap-3">
              {imgFiles.map((image, index) => (
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
              {videoFiles.map((video, index) => (
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

        {/* BUTTONS */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex gap-3">
            {/* IMAGE BUTTON */}
            <button
              type="button"
              onClick={handleClickImg}
              aria-label="Add images"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:border-amber-200/45 hover:bg-white/10 hover:text-amber-100"
            >
              <Image size={21} />
            </button>

            {/* VIDEO BUTTON */}
            <button
              type="button"
              onClick={handleClick}
              aria-label="Add video"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:border-amber-200/45 hover:bg-white/10 hover:text-amber-100"
            >
              <Video size={21} />
            </button>
          </div>

          <button
            className="rounded-xl border border-emerald-200/20 bg-emerald-300/15 px-5 py-2.5 text-sm font-semibold text-emerald-50 transition hover:-translate-y-0.5 hover:bg-emerald-300/25"
            onClick={uploadPost}
            disabled={loading}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostField;

import { Image, Video, SendHorizonal, X } from "lucide-react";
import { useRef, useState } from "react";

function ShareSM() {
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);

  const inputImage = useRef(null);
  const inputVideo = useRef(null);

  const addImageFiles = (e) => {
    const imageSelected = Array.from(e.target.files);
    setImage(imageSelected);
  };

  const addVideoFiles = (e) => {
    const videoSelected = Array.from(e.target.files);
    setVideo(videoSelected);
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

  return (
    <div className=" mx-2 mt-10 w-[80vw] mx-auto block overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] p-2 shadow-2xl shadow-black/20 backdrop-blur-xs backdrop-saturate-150 sm:p-5 md:w-xl md:block md:mx-auto sm:w-[80vw] sm:block sm:mx-auto">
      <div className="flex">
        <div className="h-12 w-12 border-white/80 border-1 rounded-full mx-3 ml-3">
          <img
            src="1787604938678.png"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <input
          readOnly
          type="text"
          placeholder="Share something special"
          className="border-none outline-none w-50 text-amber-50 overflow-auto"
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
        className="text-amber-50 mt-9 w-[70vw] focus:outline-none border-b border-white/20 mx-auto block h-20 scrollbar-none"
      ></textarea>

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

      <div className="flex gap-2.5 mt-6 justify-between">
        <div className="flex gap-4">
          <button
            onClick={handleImages}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:border-amber-200/45 hover:bg-white/10 hover:text-amber-100"
          >
            <Image className="cursor-pointer" color="White" />
          </button>

          <button
            onClick={handleVideos}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:border-amber-200/45 hover:bg-white/10 hover:text-amber-100"
          >
            <Video className="cursor-pointer" color="White" />
          </button>
        </div>
        <SendHorizonal
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:border-green-500 hover:bg-green-950 hover:text-amber-100"
          color="gray"
        />
      </div>
    </div>
  );
}

export default ShareSM;

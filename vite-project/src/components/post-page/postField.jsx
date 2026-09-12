import { ImagePlus, Send, X } from "lucide-react";
import { useEffect, useState } from "react";

function PostField() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    return () => {
      if (image?.preview) URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (image?.preview) URL.revokeObjectURL(image.preview);
    setImage({ file, preview: URL.createObjectURL(file) });
    setNotice("");
  }

  function removeImage() {
    if (image?.preview) URL.revokeObjectURL(image.preview);
    setImage(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!caption.trim() && !image) {
      setNotice("Add a thought or an image before posting.");
      return;
    }

    setNotice("Your post is ready to share.");
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-6">
      <label htmlFor="post-caption" className="sr-only">
        What is on your mind?
      </label>
      <textarea
        id="post-caption"
        value={caption}
        onChange={(event) => {
          setCaption(event.target.value);
          setNotice("");
        }}
        placeholder="What is on your mind?"
        className="min-h-44 w-full resize-y bg-transparent text-lg leading-relaxed text-white outline-none placeholder:text-white/35"
      />

      {image && (
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/15 bg-black/20">
          <img
            src={image.preview}
            alt="Selected post preview"
            className="max-h-80 w-full object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            aria-label="Remove selected image"
            title="Remove image"
            className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white transition hover:bg-black"
          >
            <X size={17} />
          </button>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3">
          <label
            htmlFor="post-image"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm text-white/70 transition hover:border-amber-200/60 hover:text-amber-200"
          >
            <ImagePlus size={18} />
            Add image
          </label>
          <input
            id="post-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only"
          />
          <span className="text-xs text-white/40">{caption.length}/280</span>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 font-semibold text-black transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200/70 focus:ring-offset-2 focus:ring-offset-black"
        >
          Post
          <Send size={16} />
        </button>
      </div>
      {notice && (
        <p className="mt-4 text-sm text-amber-200/90" role="status">
          {notice}
        </p>
      )}
    </form>
  );
}
export default PostField;

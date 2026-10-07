export default function getPostMedia(post) {
  if (Array.isArray(post?.media) && post.media.length > 0) {
    return post.media;
  }

  return post?.image
    ? [
        {
          id: `${post.id}-legacy-media`,
          url: post.image,
          mediaType: post.mediaType,
        },
      ]
    : [];
}

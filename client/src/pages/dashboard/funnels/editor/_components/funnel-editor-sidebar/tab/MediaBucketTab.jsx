import MediaBucket from "@/components/media/MediaBucket";
import { useGetMedia } from "@/lib/tanstack-query/queries";
import { useParams } from "@tanstack/react-router";

const MediaBucketTab = () => {
  const { id } = useParams({ strict: false });
  const { data: media, refetch } = useGetMedia(id);

  if (!media) return;
  return (
    <div className="h-[900px] overflow-scroll p-4">
      <MediaBucket data={media} refetch={refetch} subAccountId={id} />
    </div>
  );
};

export default MediaBucketTab;

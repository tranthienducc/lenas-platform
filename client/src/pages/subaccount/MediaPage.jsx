import MediaBucket from "@/components/media/MediaBucket";
import { useGetMedia } from "@/lib/tanstack-query/queries";
import { useParams } from "@tanstack/react-router";

const MediaPage = () => {
  const { id } = useParams({ strict: false });
  const { data: media, refetch } = useGetMedia(id);

  return <MediaBucket subAccountId={id} data={media} refetch={refetch} />;
};

export default MediaPage;

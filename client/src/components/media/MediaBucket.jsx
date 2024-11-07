import DialogMediaBucket from "@/components/common/DialogMediaBucket";
import MediaCard from "@/components/media/MediaCard";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FolderSearch } from "lucide-react";
import PropTypes from "prop-types";

const MediaBucket = ({ subAccountId, refetch, data }) => {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Media Bucket</h1>
        <DialogMediaBucket subAccountId={subAccountId} refetch={refetch} />
      </div>
      <Command className="bg-transparent">
        <CommandInput placeholder="Search for file name" />
        <CommandList className="max-h-full pb-40">
          <CommandEmpty>No Media Files</CommandEmpty>
          <CommandGroup heading="Media Files">
            <div className="flex flex-wrap gap-4 pt-4">
              {data?.Media?.map((file) => (
                <CommandItem
                  key={file.id}
                  className="p-0 max-w-[300px] w-full rounded-xl !bg-transparent !font-medium !text-white"
                >
                  <MediaCard file={file} refetch={refetch} />
                </CommandItem>
              ))}
              {!data?.Media?.length && (
                <div className="flex flex-col items-center justify-center w-full">
                  <FolderSearch
                    size={20}
                    className="dark:text-muted text-slate-300"
                  />
                  <p className="text-muted-foreground">Emty no file to show</p>
                </div>
              )}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default MediaBucket;

MediaBucket.propTypes = {
  subAccountId: PropTypes.string,
  data: PropTypes.object,
  refetch: PropTypes.any,
};

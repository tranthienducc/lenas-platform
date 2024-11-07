import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { TAG_COLORS } from "@/constants";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { getTagsForSubaccount } from "@/lib/actions/subaccount/get-tags-for-subaccount";
import { deleteTag } from "@/lib/actions/tags/delete-tag";
import { upsertTag } from "@/lib/actions/tags/upsert-tag";
import Tags from "@/pages/subaccount/pipelines/_components/Tags";
import { PlusCircleIcon, TrashIcon, X } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const TagCreator = ({ getSelectedTags, subAccountId, defaultTags }) => {
  const [selectedTags, setSelectedTags] = useState(defaultTags || []);
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (getSelectedTags) {
      getSelectedTags(selectedTags);
    }
  }, [selectedTags, getSelectedTags]);

  useEffect(() => {
    if (subAccountId) {
      const fetchData = async () => {
        const response = await getTagsForSubaccount(subAccountId);
        if (response) setTags(response?.Tags || []);
      };
      fetchData();
    }
  }, [subAccountId]);

  const handleAddSelections = (tag) => {
    if (selectedTags?.every((t) => t?.id !== tag?.id)) {
      const newSelectedTags = [...selectedTags, tag];
      setSelectedTags(newSelectedTags);
    }
  };

  const handleDeleteSelection = (tagId) => {
    setSelectedTags(selectedTags.filter((tag) => tag?.id !== tagId));
  };

  const handleAddTag = async () => {
    if (!value) {
      toast.warning("Tags need to have a name");
      return;
    }

    if (!selectedColor) {
      toast.warning("Please select a color");
      return;
    }

    const tagData = {
      color: selectedColor,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: uuidv4(),
      name: value,
      subAccountId,
    };

    const currentTags = Array.isArray(tags) ? tags : [];
    setTags([...currentTags, tagData]);
    setValue("");
    setSelectedColor("");

    try {
      const response = await upsertTag(subAccountId, tagData);
      toast.success("Create tag successfully");

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a tag | ${response?.name}`,
        subaccountId: subAccountId,
      });
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to create tag");
    }
  };

  const handleDeleteTag = async (tagId) => {
    setTags(tags.filter((tag) => tag?.id !== tagId));
    try {
      const response = await deleteTag(tagId);
      toast.success("Delete tag successfully");
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Deleted a tag | ${response?.name}`,
        subAccountId: subAccountId,
      });
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete tag!");
    }
  };

  console.log("selected-color", selectedColor);
  console.log("selected-tags", selectedTags);
  console.log("tags", tags);
  console.log("getSelectedTags", getSelectedTags);

  return (
    <AlertDialog>
      <Command className="bg-transparent">
        {!!selectedTags.length && (
          <div className="flex flex-wrap gap-2 p-2 border-2 rounded-md bg-background border-border">
            {selectedTags?.map((tag) => (
              <div key={tag?.id} className="flex items-center">
                <Tags title={tag?.name} colorName={tag?.color} />

                <X
                  size={14}
                  className="cursor-pointer text-muted-foreground"
                  onClick={() => handleDeleteSelection(tag?.id)}
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 my-2">
          {TAG_COLORS?.map((colorName) => (
            <Tags
              key={colorName}
              selectedColor={setSelectedColor}
              title=""
              colorName={colorName}
            />
          ))}
        </div>
        <div className="relative">
          <CommandInput
            placeholder="Search for tag..."
            value={value}
            onValueChange={setValue}
          />
          <PlusCircleIcon
            onClick={handleAddTag}
            size={20}
            className="absolute transition-all transform -translate-y-1/2 cursor-pointer top-1/2 right-2 hover:text-primary text-muted-foreground"
          />
        </div>
        <CommandList>
          <CommandSeparator />
          <CommandGroup heading="Tags">
            {tags?.map((tag) => (
              <CommandItem
                key={tag?.id}
                className="hover:!bg-secondary !bg-transparent justify-between flex items-center !font-light cursor-pointer"
              >
                <div onClick={() => handleAddSelections(tag)}>
                  <Tags title={tag?.name} colorName={tag?.color} />
                </div>

                <AlertDialogTrigger>
                  <TrashIcon
                    size={16}
                    className="transition-all cursor-pointer text-muted-foreground hover:text-rose-400"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-left">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-left">
                      This action cannot be undone. This will permanently delete
                      your the tag and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="items-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive"
                      onClick={() => handleDeleteTag(tag.id)}
                    >
                      Delete Tag
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>
    </AlertDialog>
  );
};

export default TagCreator;

TagCreator.propTypes = {
  getSelectedTags: PropTypes.func,
  subAccountId: PropTypes.string,
  defaultTags: PropTypes.array,
};

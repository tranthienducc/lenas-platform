import supabase from "@/utils/supabase";

export async function upsertPipelines(pipeline) {
  try {
    // Nếu pipeline.id tồn tại, thực hiện cập nhật
    if (pipeline.id) {
      const { data: updatedPipeline, error: updateError } = await supabase
        .from("Pipeline")
        .update(pipeline)
        .eq("id", pipeline.id);

      if (updateError) {
        console.error("Supabase update error:", updateError);
        return { error: updateError.message };
      }

      return updatedPipeline;
    } else {
      // Nếu pipeline.id không tồn tại, thực hiện chèn mới
      const { data: newPipeline, error: insertError } = await supabase
        .from("Pipeline")
        .insert({
          ...pipeline,
        });

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        return { error: insertError.message };
      }

      return newPipeline;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dubjonjbfyojczxirwyk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1YmpvbmpiZnlvamN6eGlyd3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNTU1NTUsImV4cCI6MjA1NzgzMTU1NX0.btoD2qhBAgxITGi8JQ6aUFvpwAEUFJ_zsj-RvrnairA";

const supabase = createClient(supabaseUrl, supabaseKey);
//hola
export const uploadImage = async (file, bucket, folder) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2, 15)}_${Date.now()}.${fileExt}`;

    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};
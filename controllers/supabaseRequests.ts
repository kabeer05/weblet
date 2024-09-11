import { supabaseClient } from "@/lib/supabaseClient";

export const getScripts = async ({
  user_id,
  token,
}: {
  user_id: string;
  token: any;
}) => {
  const supabase = await supabaseClient(token);
  const { data: scripts } = await supabase
    .from("scripts")
    .select("*")
    .eq("user_id", user_id);

  return scripts;
};

export const getScript = async ({
  user_id,
  token,
  script_id,
}: {
  user_id: string;
  token: any;
  script_id: string;
}) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .eq("user_id", user_id)
    .eq("id", script_id);

  if (error) {
    throw error;
  }

  return data;
};

export const createNewScript = async ({
  user_id,
  token,
  language,
  title,
  description = "",
  isPublic = false,
}: {
  user_id: string;
  token: any;
  language: string;
  title: string;
  description: string;
  isPublic: boolean;
}) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("scripts")
    .insert({
      user_id,
      language,
      title,
      code: "",
      description,
      isPublic,
    })
    .select("*");

  if (error) {
    throw error;
  }
  return data;
};

export const deleteScript = async ({
  user_id,
  token,
  script_id,
}: {
  user_id: string;
  token: any;
  script_id: string;
}) => {
  const supabase = await supabaseClient(token);
  const { error, data } = await supabase
    .from("scripts")
    .delete()
    .eq("user_id", user_id)
    .eq("id", script_id);

  if (error) {
    throw error;
  }

  return data;
};

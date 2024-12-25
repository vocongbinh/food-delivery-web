import { toast } from 'react-toastify';
import supabase from '../app/supabaseClient';

export async function uploadImage(file: File): Promise<string> {
  if (!file) toast.error('No file found');

  const fileName = `${Date.now()}_${file.name}`; // Unique file name
  const { error } = await supabase.storage
    .from('dish') // Replace with your bucket name
    .upload(fileName, file);

  if (error) { console.log(error) };

  // Get the public URL of the uploaded file
  const { data } = supabase.storage
    .from('dish')
    .getPublicUrl(fileName);
    console.log(data.publicUrl);

  return  data.publicUrl;
}
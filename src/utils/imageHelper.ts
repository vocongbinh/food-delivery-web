import { toast } from 'react-toastify';
import supabase from '../app/supabaseClient';

export async function uploadImage(file: File): Promise<string> {
  if (!file) toast.error('No file found');

  const fileName = `${Date.now()}_${file.name}`; // Unique file name
  const { error } = await supabase.storage
    .from('upload-image') // Replace with your bucket name
    .upload(fileName, file);

  if (error) { console.log(error) };

  // Get the public URL of the uploaded file
  const { data } = supabase.storage
    .from('your-bucket-name')
    .getPublicUrl(fileName);

  return  data.publicUrl;
}
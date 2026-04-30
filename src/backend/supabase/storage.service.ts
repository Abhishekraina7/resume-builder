import { supabase } from "./supabase";

export interface DocumentMetadata {
  id?: string;
  userId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  downloadUrl: string;
  createdAt: any;
}

export const uploadDocument = (
  file: File,
  userId: string,
  onProgress: (progress: number) => void
): Promise<DocumentMetadata> => {
  return new Promise(async (resolve, reject) => {
    if (!file || !userId) {
      reject(new Error("File and User ID are required"));
      return;
    }

    try {
      const uniqueFileName = `${Date.now()}_${file.name}`;
      const filePath = `${userId}/${uniqueFileName}`;

      // Simulate progress for smooth UX 
      let progress = 0;
      const interval = setInterval(() => {
        progress += 15;
        if (progress > 90) progress = 90;
        onProgress(progress);
      }, 200);

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(interval);
      onProgress(100);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Save to Supabase Postgres table
      const docData = {
        user_id: userId,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
        download_url: urlData.publicUrl,
      };

      const { data: dbData, error: dbError } = await supabase
        .from('documents')
        .insert([docData])
        .select()
        .single();

      if (dbError) throw dbError;

      resolve({
        id: dbData.id,
        userId: dbData.user_id,
        fileName: dbData.file_name,
        fileSize: dbData.file_size,
        fileType: dbData.file_type,
        downloadUrl: dbData.download_url,
        createdAt: dbData.created_at,
      });

    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUserDocuments = async (userId: string): Promise<DocumentMetadata[]> => {
  if (!userId) throw new Error("User ID is required");

  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(doc => ({
      id: doc.id,
      userId: doc.user_id,
      fileName: doc.file_name,
      fileSize: doc.file_size,
      fileType: doc.file_type,
      downloadUrl: doc.download_url,
      createdAt: doc.created_at,
    }));
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
  }
};

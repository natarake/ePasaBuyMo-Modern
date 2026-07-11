import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import app from '../firebase/Firebase';

export const uploadFileToStorage = ({ file, onProgress, onError, onSuccess }) => {
  if (!file) {
    return null;
  }

  const fileName = `${Date.now()}-${file.name}`;
  const storage = getStorage(app);
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress?.(progress, snapshot.state);
    },
    (error) => {
      onError?.(error);
    },
    async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onSuccess?.(downloadURL);
      } catch (error) {
        onError?.(error);
      }
    }
  );

  return uploadTask;
};

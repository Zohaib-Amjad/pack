/**
 * Cloudinary Utility for Image Uploads
 * Handles image compression and uploading to Cloudinary via XHR (for progress tracking).
 */

export interface UploadOptions {
  skipOptimization?: boolean;
  onProgress?: (percent: number) => void;
  cloudName: string;
  uploadPreset: string;
}

/**
 * Compresses an image using Canvas.
 * Preserves PNG format (and transparency) for PNG inputs; converts others to JPEG.
 */
export const compressImage = async (
  file: File, 
  maxWidth = 1600, 
  maxHeight = 1600, 
  quality = 0.8
): Promise<Blob | File> => {
  try {
    // createImageBitmap is fast and clean
    const bitmap = await createImageBitmap(file);
    
    let width = bitmap.width;
    let height = bitmap.height;

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // For non-PNG formats, fill with white before drawing to avoid black backgrounds
    const isPng = file.type === 'image/png';
    if (!isPng && ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }

    ctx?.drawImage(bitmap, 0, 0, width, height);
    bitmap.close(); // Clean up memory

    // Preserve PNG to keep transparency; use JPEG for everything else
    const mimeType = isPng ? 'image/png' : 'image/jpeg';

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas to Blob failed'));
        },
        mimeType,
        isPng ? undefined : quality,
      );
    });
  } catch (err) {
    console.warn("Compression failed, falling back to original file:", err);
    return file;
  }
};

/**
 * Uploads a file or blob to Cloudinary.
 */
export const uploadToCloudinary = async (
  fileOrBlob: File | Blob,
  options: UploadOptions
): Promise<{ secure_url: string }> => {
  const { cloudName, uploadPreset, onProgress } = options;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration missing (cloudName or uploadPreset).");
  }

  const isPng = fileOrBlob instanceof File && fileOrBlob.type === 'image/png';
  const fileExt = isPng ? 'png' : (fileOrBlob instanceof File ? fileOrBlob.name.split('.').pop() : "jpg");
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  
  const formData = new FormData();
  formData.append("file", fileOrBlob);
  formData.append("upload_preset", uploadPreset);
  formData.append("public_id", fileName.replace(`.${fileExt}`, ""));

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", uploadUrl);

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total) * 100;
          onProgress(Math.max(1, Math.round(percent)));
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Cloudinary Error: ${xhr.statusText} - ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network connection failed during Cloudinary upload."));
    
    // Set a timeout of 90 seconds
    const timeout = setTimeout(() => {
        xhr.abort();
        reject(new Error("Cloudinary upload timed out (90s). Please check connection."));
    }, 90000);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            clearTimeout(timeout);
        }
    };

    xhr.send(formData);
  });
};

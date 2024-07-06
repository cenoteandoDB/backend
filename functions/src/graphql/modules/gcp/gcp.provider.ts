import { Storage, GetSignedUrlConfig } from "@google-cloud/storage";
import { PhotoOrMapUploadInput } from "../../generated-types/graphql";

const storage = new Storage({
  keyFilename: "credentials/cenoteando.json",
});
const bucketName = process.env.BUCKET_NAME!;

export const StorageProvider = {
  getPhotos: async (cenoteId: string) => {
    return getSignedUrls(`photos/${cenoteId}/`);
  },

  getMaps: (cenoteId: string) => {
    return getSignedUrls(`maps/${cenoteId}/`);
  },

  getThumbnail: async (name: string): Promise<string> => {
    const result = await getSignedUrls(`capas/${name}/thumbnail.jpg`);
    return result.at(0)!;
  },

  getMetadata: async (name: string): Promise<string> => {
    const result = await getSignedUrls(`capas/${name}/metadata.pdf`);
    return result.at(0)!;
  },

  uploadPhoto: async (photo: PhotoOrMapUploadInput): Promise<boolean> => {
    const filename = `photos/${photo.cenoteId}/${photo.filename}`;
    return uploadFile(filename, photo.content);
  },

  uploadMap: async (map: PhotoOrMapUploadInput): Promise<boolean> => {
    const filename = `mapas/${map.cenoteId}/${map.filename}`;
    return uploadFile(filename, map.content);
  },

  uploadReference: async (pdfName: string, pdfBase64: string): Promise<boolean> => {
    const filename = `references/${pdfName}.pdf`;
    return uploadFile(filename, pdfBase64);
  },

  getReference: async (name: string): Promise<string> => {
    const result = await getSignedUrls(`references/${name}.pdf`);
    return result.at(0)!;
  },
};

const getSignedUrls = async (prefix: string): Promise<string[]> => {
  const [files] = await storage.bucket(bucketName).getFiles({ prefix });

  const signedUrls = [];

  const options: GetSignedUrlConfig = {
    version: "v4",
    action: "read",
    expires: Date.now() + 15 * 60 * 1000,
  };

  for (const file of files) {
    const [url] = await file.getSignedUrl(options);
    signedUrls.push(url);
  }

  return signedUrls;
};

const uploadFile = async (
  filename: string,
  content: string,
): Promise<boolean> => {
  const decodedBytes = Buffer.from(content, "base64");

  try {
    const file = storage.bucket(bucketName).file(filename);
    const stream = file.createWriteStream({
      metadata: {
        contentType: "application/octet-stream",
      },
    });
    stream.end(decodedBytes);
  } catch (error) {
    return false;
  }

  return true;
};

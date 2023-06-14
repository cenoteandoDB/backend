import { Storage, GetSignedUrlConfig } from '@google-cloud/storage';

const storage = new Storage()
//TODO get from env file
const bucketName = 'your-bucket-name';

export const StorageProvider = { 

    getPhotos: async (cenoteId: String) => {
        return getSignedUrls(`photos/${cenoteId}/`)
    },

    getMaps: (cenoteId: String) => {
        return getSignedUrls(`maps/${cenoteId}/`)
    }

}


const getSignedUrls = async (prefix: string) => {
    const [files] = await storage.bucket(bucketName).getFiles({prefix})
    
    const signedUrls = []

    const options: GetSignedUrlConfig = {
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000,
        };

    for(const file of files) {
        const [url] = await file.getSignedUrl(options);
        signedUrls.push(url);
    }

    return signedUrls;
}
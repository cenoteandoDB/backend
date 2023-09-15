import { Storage, GetSignedUrlConfig } from '@google-cloud/storage';

const storage = new Storage({
    keyFilename: "credentials/cenoteando.json"
})
const bucketName = process.env.BUCKET_NAME!;

export const StorageProvider = { 

    getPhotos: async (cenoteId: String) => {
        return getSignedUrls(`photos/${cenoteId}/`)
    },

    getMaps: (cenoteId: String) => {
        return getSignedUrls(`maps/${cenoteId}/`)
    },

    getThumbnail: async (name: String): Promise<string> => {
        const result = await getSignedUrls(`capas/${name}/thumbnail.jpg`)
        return result.at(0)!
    },

    getMetadados: async (name: String): Promise<string> => {
        const result = await getSignedUrls(`capas/${name}/metadatos.pdf`)
        console.log("Metadados: " + result)
        return result.at(0)!
    }

}


const getSignedUrls = async (prefix: string): Promise<string[]> => {
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
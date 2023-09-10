import { Storage } from '@google-cloud/storage';
import { Injectable } from 'graphql-modules';
import NodeCache from "node-cache";

@Injectable()
export class LayersProvider {

    private cache = new NodeCache( { stdTTL: 60 * 60 } );
    private bucketName: string = process.env.BUCKET_NAME!;
    private storage = new Storage({
        keyFilename: "credentials/cenoteando.json"
    })

    async getLayer(layer: string): Promise<string> {
        const layerName = `capas/${layer}/${layer}.zip`
        const cachedContent = await this.cache.get(layerName)
        if(cachedContent) {
            return String(cachedContent)
        }

        const file = this.storage.bucket(this.bucketName).file(layerName)
        const [fileExists] = await file.exists()
        if (!fileExists) {
            //TODO throw exception
        }

        const [fileContents] = await file.download()

        const base64File = fileContents.toString('base64')

        this.cache.set(layerName, base64File)

        return base64File
    }

    async getJson(layer: string): Promise<string> {
        const layerName = `capas/${layer}/${layer}.json`
        const cachedContent = await this.cache.get(layerName)

        if(cachedContent) {
            return String(cachedContent)
        }
        const file = this.storage.bucket(this.bucketName).file(layerName)
        const [fileExists] = await file.exists()
        if (!fileExists) {
            //TODO throw exception
        }

        const [fileContents] = await file.download()

        const content = fileContents.toString()

        this.cache.set(layerName, content)

        return content
    }

}
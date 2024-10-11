import pinata from './client';

export async function storeData(args: Record<string, any>): Promise<string> {
    try {
        console.log("Trying to store data pinata");
        const upload = await pinata.upload.json(args)
        console.log("Successfully stored data pinata");
        return upload.cid;
    } catch (err) {
        console.log(err);
        throw new Error("Could Not Store Data");
    }
}
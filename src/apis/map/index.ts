import axios from "axios";

export class MapApi {
   static async getAddress(longtitude : number, latitude : number): Promise<string> {
        const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longtitude},${latitude}.json`, {
            params: {
                access_token: process.env.NEXT_PUBLIC_MAP_TOKEN || ""
            }
        })
        const data = res.data
        return data["features"][0]["place_name"]
    }
}

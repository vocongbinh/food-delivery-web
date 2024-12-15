export async function getRoute(start: number[], end: number[]) {
  const accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN || "";
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(
    ","
  )};${end.join(",")}?geometries=geojson&access_token=${accessToken}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.routes[0].geometry;
}

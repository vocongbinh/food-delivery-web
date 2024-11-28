"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Geocoder, SearchBox } from "@mapbox/search-js-react";
import { useAddressContext } from "@/contexts/address/address-context";

const MapComponent = ({inputValue, setInputValue}) => {
  const mapContainerRef = useRef();
  const {location} = useAddressContext()
  const mapInstanceRef = useRef();
  const [lng, setLng] = useState(location.longitude);
  const [lat, setLat] = useState(location.latitude); // Default latitude
  const handleSearchResult = (event) => {
    console.log("event", event);
    const [lon, lat] = event.features[0].geometry.coordinates;
    setLng(lon);
    setLat(lat);
    setInputValue(event.features[0].properties.full_address);
    try {
      new mapboxgl.Marker().setLngLat([lon, lat]).addTo(mapInstanceRef.current)

    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN || "";
    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [lng, lat],
      zoom: 15,
    });

    mapInstanceRef.current.addControl(new mapboxgl.NavigationControl());

    // new mapboxgl.Marker()
    //   .setLngLat([longitude, latitude])
    //   .addTo(mapInstanceRef.current);

    // return () => {
    //   mapInstanceRef.current.remove()

    // }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter([lng, lat]);
    }
  }, [lng, lat]);
  return (
    <>
      <SearchBox
        accessToken={process.env.NEXT_PUBLIC_MAP_TOKEN || ""}
        map={mapInstanceRef.current}
        mapboxgl={mapboxgl}
        options={{ placeholder: "Search for an address" }}
        value={inputValue}
        onChange={(d) => {
          setInputValue(d);
        }}
        onRetrieve={handleSearchResult}
      />
      <div id="map-container" ref={mapContainerRef} style={{ height: 300 }} />
    </>
  );
};

export default MapComponent;

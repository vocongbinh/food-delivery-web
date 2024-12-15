"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Geocoder, SearchBox } from "@mapbox/search-js-react";
import { useAddressContext } from "@/contexts/address/address-context";
import { getRoute } from "@/utils/mapHelper";

const DistanceMapComponent = ({ long, lat }) => {
  const mapContainerRef = useRef();
  const { location } = useAddressContext();
  const mapInstanceRef = useRef();
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN || "";
    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [long, lat],
      zoom: 10,
      style: "mapbox://styles/mapbox/streets-v12",
    });
    const point1 = [location.longitude, location.latitude];
    const point2 = [long, lat];

    const addRoute = async () => {
      const route = await getRoute(point1, point2); // Gọi hàm lấy dữ liệu GeoJSON

      // Thêm source cho tuyến đường
      mapInstanceRef.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route,
        },
      });

      // Thêm layer hiển thị tuyến đường
      mapInstanceRef.current.addLayer({
        id: 'route-layer',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#1DB954', // Màu tuyến đường
          'line-width': 5,
        },
      });
    };
    mapInstanceRef.current.addControl(new mapboxgl.NavigationControl());

    // const loadDirectionsPlugin = async () => {
    //   // const script = document.createElement("script");
    //   // script.src = "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.js";
    //   // script.async = true;
    //   // script.onload = () => this.scriptLoaded();
    
    //   // document.body.appendChild(script);
    //   // const { default: MapboxDirections } = await import( ''
    //   // );

    //   // Add the Directions plugin to the map
    //   const directions = new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //     unit: 'metric', // Metric units
    //     profile: 'mapbox/driving', // Travel mode: driving, walking, cycling
    //   });

    //   directions.setOrigin([location.longitude, location.latitude]); // Set origin (lng, lat)
    //   directions.setDestination([long, lat]); // Set destination (lng, lat)
    //   mapInstanceRef.current.addControl(directions, "top-left");
    // };
    // loadDirectionsPlugin()
   
    mapInstanceRef.current.on('load', addRoute);

    // Add markers for the points
    new mapboxgl.Marker().setLngLat(point1).addTo(mapInstanceRef.current);
    new mapboxgl.Marker().setLngLat(point2).addTo(mapInstanceRef.current);
    // new mapboxgl.Marker()
    //   .setLngLat([longitude, latitude])
    //   .addTo(mapInstanceRef.current);

    return () => {
      mapInstanceRef.current.remove()

    }
  }, []);
  return (
    <>
      <div id="map-container" ref={mapContainerRef} style={{ height: 300 }} />
    </>
  );
};

export default DistanceMapComponent;

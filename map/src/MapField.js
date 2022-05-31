import React from 'react';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
   
  } from "react-leaflet";
  import { useEffect, useState } from "react";
  import L from "leaflet";
  import locationData from "./location.json";
  import "leaflet-boundary-canvas";
const MapField = ({score,setScore,result}) => {

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"
  });

    const [activePark, setActivepark] = useState(null);
  // const [position, setPosition] = useState(null);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const dataset = locationData.cities;
  console.log(dataset[0].gps.lat);
 const[dist,setDist] = useState(0);
  const [mapState, setMapState] =useState({lat: 41.257017, lng: 29.077524,zoom: 13})
    useEffect(()=>{
 
   },[]);

  function distance(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return c * r;
  }
 

const  AddMarkerToClick = () => {
  
 
    const map = useMapEvents({
     
      click(event) {
        console.log(map);
        map.locate();
       
        setScore(result--);
        const { lat, lng } = event.latlng;

        setPosition({
          latitude: lat,
          longitude: lng,
        });
        
      },
      
    });
    
    var nearestPoint = nerestPoint(position.latitude, position.longitude);
     if (nearestPoint <= 50) {
       console.log(nearestPoint);
       alert(dist+" Km");
  
     }
    // dataset.map( data =>distance(position.latitude,51.507351,position.longitude,-0.127758) );

    

    return position.latitude !== 0 ? (
      //  console.log(nerestPoint(position.latitude, position.longitude)),

      <Marker
        position={[position.latitude, position.longitude]}
        interactive={false}
        //icon={mapIcon}
      />
    ) : null;
  }

  const nerestPoint = (platitude, plongitude) => {
    var mindistance = [];
    dataset.map((data) =>
      mindistance.push(
        distance(platitude, data.gps.lat, plongitude, data.gps.lng)
      )
    );
    var min = Math.min(...mindistance);
    console.log(min);
    setDist(min);
    return min;
  };



    return (
        <div className="leaflet-container">
        <MapContainer
          center={{ lat: 51.505, lng: -0.09 }}
          zoom={13}
          scrollWheelZoom={true}
        
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> 
 
        <AddMarkerToClick /> 
           {dataset.map((data, index) => (
            <Marker
              key={data.name}
              position={[data.gps.lat, data.gps.lng]}
              eventHandlers={{
                // click: () => {
                //   //alert("clicked");
                // },
              }}
            >
              <Popup>{data.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
};

export default MapField;
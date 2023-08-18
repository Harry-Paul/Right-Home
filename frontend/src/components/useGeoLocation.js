import {useEffect, useState} from 'react';
import leafletElement from "leaflet";

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {lat: "", lon: ""}
    });

    const onSucces = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            },
        });
    };

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        });
    }

    useEffect(() => {
        if(!("geolocation" in navigator)){
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }
        navigator.geolocation.getCurrentPosition(onSucces, onError);
    },[]);
    return location;
}

export default useGeoLocation;

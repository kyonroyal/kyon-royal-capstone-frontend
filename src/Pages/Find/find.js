import React, { useState, useEffect } from "react";
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/NavBar/navbar";
import './find.scss'


function Find() {
    const localhost = '172.20.10.3'; // Update this to your localhost
    const googleMapsApiKey = 'AIzaSyAcIzDGRwzVEDZL7lyxAWsR-W_wSTHNY6c';
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        zip: '',
    });

    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.zip) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const coordinates = await geocodeZipCode(formData.zip);

            if (coordinates) {
                const newUser = {
                    name: formData.name,
                    zip: formData.zip,
                    coordinates: coordinates,
                };

                await addUser(newUser);
            } else {
                alert('Invalid zip code. Please provide a valid zip code.');
            }
        } catch (error) {
            console.error('Error submitting artist:', error);
        }
    };

    async function geocodeZipCode(zipCode) {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${googleMapsApiKey}`
            );

            if (response.data.status === 'OK') {
                return response.data.results[0].geometry.location;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            return null;
        }
    }

    async function addUser(newUser) {
        try {
            const response = await axios.post(`http://${localhost}:8080/users`, newUser);
            const updatedUsers = [...users, response.data];
            setUsers(updatedUsers);
            setFormData({
                name: '',
                zip: '',
            });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }

    useEffect(() => {
        setIsLoading(true);

        async function fetchData() {
            try {
                const jsonResponse = await axios.get(`http://${localhost}:8080/users`);
                const usersFromJson = jsonResponse.data;
                const usersWithCoordinatesPromises = usersFromJson.map(async (user) => {
                    if (user.zip) {
                        const coordinates = await geocodeZipCode(user.zip);
                        if (coordinates) {
                            return { ...user, coordinates };
                        }
                    }
                    return null;
                });
                const usersWithCoordinates = (await Promise.all(usersWithCoordinatesPromises))
                    .filter(user => user && user.coordinates);

                setUsers(usersWithCoordinates);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    const defaultProps = {
        center: {
            lat: 25.761681,
            lng: -80.191788,
        },
        zoom: 10,
    };

    const customMapStyles = [
        {
            featureType: "all",
            elementType: "geometry",
            stylers: [
                { saturation: -50 },
                { lightness: 40 },
            ]
        }
    ];

    const UserMarker = ({ name }) => {
        return (
            <div className="user-marker">
                {name}
            </div>
        );
    };

    function groupUsers(usersArray) {
        let matrix = [];
        let sorted = [...usersArray].sort((a, b) => a.zip - b.zip);

        while (sorted.length > 0) {
            let current = sorted[0].zip;
            let currentList = [];

            for (let i = 0; i < sorted.length; i++) {
                if (sorted[i].zip === current) {
                    currentList.push(sorted[i]);
                }
            }
            matrix.push(currentList);
            sorted = sorted.filter((user) => user.zip !== current);
        }
        return matrix;
    }

    const sortedUsers = groupUsers(users);

    return (
        <div className="dash">
             <Navbar/>
               
            <div>
                <p className="artist-title">Find Nearby artists </p>
                {sortedUsers.map(users => (
                    <div className="artist" key={users[0].id}>
                        <p className="artist">Artists at zip code <u>{users[0].zip}</u>:</p>
                        {users.map(user => (
                            <div className='user' key={user.id}>
                                {user.name}
                                <Link to={`/update-user/${user.id}`}><div>🖊</div></Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="artist-form">
                <h3>Find an Artist</h3>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Name:
                        <input className="artist-form1" type="text" name="name" value={formData.name} onChange={handleFormChange} />
                    </label>
                    <label className="artist-form2">
                        Zip Code:
                        <input type="text" name="zip" value={formData.zip} onChange={handleFormChange} />
                    </label>
                    <button type="submit">coKraft!</button>
                </form>
            </div>
            <div className='map' style={{ height: '400px', width: '100%' }}>
                {!isLoading && (
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: googleMapsApiKey }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        options={{ styles: customMapStyles }}
                    >
                        {users.map((user) => (
                            user.coordinates ? (
                                <UserMarker
                                    key={user.id}
                                    lat={user.coordinates.lat}
                                    lng={user.coordinates.lng}
                                    name={user.name}
                                />
                            ) : null
                        ))}
                    </GoogleMapReact>
                )}
            </div>
        </div>
    );
}

export default Find;

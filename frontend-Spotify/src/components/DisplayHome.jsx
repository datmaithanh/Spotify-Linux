import React, { useEffect, useState } from "react";

import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { getAllSongs } from "../apis/songApi";
import ArtistItem from "./ArtistItem";
import { getAllArtist } from "../apis/artistApi";
import { getAllAlbum } from "../apis/albumApi";

const DisplayHome = () => {
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);


    useEffect(() => { 
        const fetchArtists = async () => {
            const data = await getAllArtist();
            console.log(data);
            setArtists(data);
        };
        fetchArtists();
        const fetchAlbums = async () => {
            const data = await getAllAlbum();
            console.log(data);
            setAlbums(data);
        };
        fetchAlbums();
    }, []);
    useEffect(() => {
        const fetchSongs = async () => {
            const data = await getAllSongs();
            console.log(data);
            setSongs(data);
        };
        fetchSongs();
    }, []);

    

    return (
        <>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                <div className="flex overflow-auto ">
                    {albums.map((item, index) => (
                        <AlbumItem
                            key={index}
                            name={item.title}
                            decs={item.release_date}
                            image={item.image}
                            id={item.id}
                        />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Artist</h1>
                <div className="flex overflow-auto ">
                    {artists.map((item, index) => (
                        <ArtistItem
                            key={index}
                            name={item.name}
                            decs={item.bio}
                            image={item.image}
                            id={item.id}
                        />
                    ))}
                </div>
            </div>
            <div className="mb-8">
                <h1 className="my-5 font-bold text-3xl text-white">
                    🔥 Today's Biggest Hits
                </h1>

                {songs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {songs.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#1e1e1e] rounded-lg p-4 hover:bg-[#2a2a2a] transition duration-200 shadow-md"
                            >
                                <SongItem
                                    name={item.title}
                                    desc={item.desc}
                                    image={item.image}
                                    artist_name={item.artist_name}
                                    id={item.id}
                                    onAdded={() => {
                                        // Emit custom event để Sidebar lắng nghe
                                        window.dispatchEvent(new Event("playlist-updated"));
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">Loading...</p>
                )}
            </div>
        </>
    );
};

export default DisplayHome;

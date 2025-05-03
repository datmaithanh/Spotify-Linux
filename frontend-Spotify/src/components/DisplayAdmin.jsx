import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserAdmin from './UserAdmin'
import SongsAdmin from './SongsAdmin'
import ArtistsAdmin from './ArtistsAdmin'
import AlbumsAdmin from './AlbumsAdmin'
import VideosAdmin from './VideosAdmin'
import UserEditAdmin from './UserEditAdmin'
import CreateUserAdmin from './CreateUserAdmin'
import CreateSongAdmin from './CreateSongAdmin'
import SongEditAdmin from './SongEditAdmin'
import ArtistEditAdmin from './ArtistEditAdmin'
import CreateArtistAdmin from './CreateArtistAdmin'
import AlbumEditAdmin from './AlbumEditAdmin'
import CreateAlbumAdmin from './CreateAlbumAdmin'
import VideoEditAdmin from './VideoEditAdmin'
import CreateVideoAdmin from './CreateVideoAdmin'

const DisplayAdmin = () => {
  return (
    <div className="w-[100%] px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0 border-2 border-black">
            <Routes>
                <Route path="/admin/users" element={<UserAdmin />} />
                <Route path="/admin/users/edit/:id" element={<UserEditAdmin />} />
                <Route path="/admin/users/add" element={<CreateUserAdmin />} />
          
                {/* Add other admin routes here */}
                <Route path="/admin/songs" element={<SongsAdmin />} />
                <Route path="/admin/songs/add" element={<CreateSongAdmin />} />
                <Route path="/admin/songs/edit/:id" element={<SongEditAdmin />} />
                
                {/* Add other admin routes here */}

                <Route path="/admin/artists" element={<ArtistsAdmin />} />
                <Route path="/admin/artists/edit/:id" element={<ArtistEditAdmin />} />
                <Route path="/admin/artists/add" element={<CreateArtistAdmin />} />
                
                {/* Add other admin routes here */}
                <Route path="/admin/Albums" element={<AlbumsAdmin />} />
                <Route path="/admin/albums/edit/:id" element={<AlbumEditAdmin />} />
                <Route path="/admin/Albums/add" element={<CreateAlbumAdmin />} />
                
                {/* Add other admin routes here */}

                <Route path="/admin/videos" element={<VideosAdmin />} />
                <Route path="/admin/videos/edit/:id" element={<VideoEditAdmin />} />
                <Route path="/admin/videos/add" element={<CreateVideoAdmin />} />
                
                
            </Routes>
        </div>
  )
}

export default DisplayAdmin
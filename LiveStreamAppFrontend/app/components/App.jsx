"use client"    
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const VideoPlayer = dynamic(() => import('./VideoPlayer'), { ssr: false });
const OverlayForm = dynamic(() => import('./OverlayForm'), { ssr: false });
const OverlayList = dynamic(() => import('./OverlayList'), { ssr: false });

function App() {
  const [overlays, setOverlays] = useState([]);
  const [rtspUrl, setRtspUrl] = useState('');
  const [editingOverlay, setEditingOverlay] = useState(null);

  useEffect(() => {
    fetchOverlays();
    setRtspUrl('https://livesim.dashif.org/livesim/ato_10/testpic_2s/Manifest.mpd');
  }, []);

  const fetchOverlays = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/overlays');
      setOverlays(response.data);
    } catch (error) {
      console.error('Error fetching overlays:', error);
    }
  };

  const handleAddOverlay = async (overlayData) => {
    try {
      await axios.post('http://localhost:5000/api/overlays', overlayData);
      fetchOverlays();
      setEditingOverlay(null);
    } catch (error) {
      console.error('Error adding overlay:', error);
    }
  };

  const handleUpdateOverlay = async (id, overlayData) => {
    try {
      await axios.put(`http://localhost:5000/api/overlays/${id}`, overlayData);
      fetchOverlays();
      setEditingOverlay(null);
    } catch (error) {
      console.error('Error updating overlay:', error);
    }
  };

  const handleDeleteOverlay = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/overlays/${id}`);
      fetchOverlays();
    } catch (error) {
      console.error('Error deleting overlay:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">Livestream App</h1>
            <div className="mb-6">
              <label htmlFor="rtspUrl" className="block text-sm font-medium text-gray-900 mb-2">Stream URL</label>
              <input
                type="text"
                id="rtspUrl"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={rtspUrl}
                onChange={(e) => setRtspUrl(e.target.value)}
                placeholder="Enter stream URL"
              />
            </div>
            <div className="mb-6">
              <VideoPlayer url={rtspUrl} overlays={overlays} />
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Manage Overlays</h2>
              <OverlayForm 
                onSubmit={(data) => editingOverlay ? handleUpdateOverlay(editingOverlay._id, data) : handleAddOverlay(data)}
                initialData={editingOverlay || {}}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Overlay List</h2>
              <OverlayList 
                overlays={overlays}
                onEdit={setEditingOverlay}
                onDelete={handleDeleteOverlay}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
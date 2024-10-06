import React, { useState, useEffect } from 'react';

function OverlayForm({ onSubmit, initialData = {} }) {
  const [overlay, setOverlay] = useState({
    content: '',
    x: 0,
    y: 0,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: '#000000',
    opacity: 0.8,
    ...initialData
  });

  useEffect(() => {
    if (initialData) {
      setOverlay(prevOverlay => ({ ...prevOverlay, ...initialData }));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(overlay);
    setOverlay({
      content: '',
      x: 0,
      y: 0,
      fontSize: 16,
      color: '#ffffff',
      backgroundColor: '#000000',
      opacity: 0.8
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOverlay(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-900">Content</label>
        <input
          type="text"
          id="content"
          name="content"
          value={overlay.content}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="x" className="block text-sm font-medium text-gray-900">X Position</label>
          <input
            type="number"
            id="x"
            name="x"
            value={overlay.x}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="y" className="block text-sm font-medium text-gray-900">Y Position</label>
          <input
            type="number"
            id="y"
            name="y"
            value={overlay.y}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor="fontSize" className="block text-sm font-medium text-gray-900">Font Size</label>
        <input
          type="number"
          id="fontSize"
          name="fontSize"
          value={overlay.fontSize}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-900">Text Color</label>
          <input
            type="color"
            id="color"
            name="color"
            value={overlay.color}
            onChange={handleChange}
            className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-900">Background Color</label>
          <input
            type="color"
            id="backgroundColor"
            name="backgroundColor"
            value={overlay.backgroundColor}
            onChange={handleChange}
            className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor="opacity" className="block text-sm font-medium text-gray-900">Opacity</label>
        <input
          type="range"
          id="opacity"
          name="opacity"
          min="0"
          max="1"
          step="0.1"
          value={overlay.opacity}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData?._id ? 'Update Overlay' : 'Add Overlay'}
      </button>
    </form>
  );
}

export default OverlayForm;
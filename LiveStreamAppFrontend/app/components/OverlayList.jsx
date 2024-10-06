import React from 'react';

function OverlayList({ overlays, onEdit, onDelete }) {
  return (
    <ul className="divide-y divide-gray-200">
      {overlays.map((overlay) => (
        <li key={overlay._id} className="py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{overlay.content}</p>
              <p className="text-sm text-gray-500">
                Position: ({overlay.x}, {overlay.y}) | Font Size: {overlay.fontSize}px
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(overlay)}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(overlay._id)}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default OverlayList;
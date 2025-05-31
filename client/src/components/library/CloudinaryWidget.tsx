import React, { useEffect } from 'react';
import buttonStyles from '../../assets/css/common/Button.module.css';

declare global {
  interface Window {
    cloudinary: any;
    ml: any;
  }
}

const CloudinaryWidget: React.FC = () => {
  useEffect(() => {
    if (!window.cloudinary) return;

    window.ml = window.cloudinary.createMediaLibrary(
      {
        cloud_name: 'ddpfac0wb',
        api_key: '753913791381216',
        remove_header: false,
        max_files: '1',
        insert_caption: 'Insert',
        inline_container: '#widget_container',
        default_transformations: [[]],
        folder: { path: 'Inner-Orbit', resource_type: 'video' },
        button_class: `${buttonStyles.button} ${buttonStyles.primary}`,
        button_caption: 'Select Image or Video',
        show_upload: false,
        show_delete: false,
      },
      {
        insertHandler: function (data: any) {
          data.assets.forEach((asset: any) => {
            console.log('Inserted asset:', JSON.stringify(asset, null, 2));
          });
        }
      },
      document.getElementById('open-btn')
    );
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <button id="open-btn" className={`${buttonStyles.button} ${buttonStyles.primary}`}>
        Open Cloudinary Media Library
      </button>
      <div id="widget_container" style={{ width: '100%' }} />
    </div>
  );
};

export default CloudinaryWidget;

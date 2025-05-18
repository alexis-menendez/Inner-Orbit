import './styles.css';

window.ml = cloudinary.createMediaLibrary(
  {
    cloud_name: 'ddpfac0wb',
    api_key: '753913791381216',
    remove_header: false,
    max_files: '1',
    insert_caption: 'Insert',
    inline_container: '#widget_container',
    default_transformations: [[]],
    folder: {path: "Inner-Orbit", resource_type: "video"},
    button_class: 'myBtn',
    button_caption: 'Select Image or Video',
  },
  {
    insertHandler: function (data) {
      data.assets.forEach((asset) => {
        console.log('Inserted asset:', JSON.stringify(asset, null, 2));
      });
    },
  },
  document.getElementById('open-btn')
);
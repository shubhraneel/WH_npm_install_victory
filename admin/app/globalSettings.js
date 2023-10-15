const globalSettings = {
  backendRoute:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api/admin'
      : 'https://website-hackathon-server.herokuapp.com/api/admin',
  imageCompressionOptions: {
    maxSizeMB: 0.4,
    maxWidthOrheight: 700,
    useWebWorker: true,
  },
};

export default globalSettings;

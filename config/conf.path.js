module.exports = {
  host: {
    local: './',
    stage: './',
    prod: './',
    release: './',
  },
  staticFiles: {
    local: './',
    stage: './',
    prod: './',
    release: './',
  },
  searchApi: {
    local: {
      url: 'http://localhost:5000/search',
      key: '',
    },
    stage: {
      url: '',
      key: '',
    },
    prod: {
      url: '',
      key: '',
    },
    release: {
      url: '',
      key: '',
    },
  },
  shopPage: {
    local: 'test-',
    stage: 'test-',
    prod: '',
    release: '',
  },
  trackingCode: {
    local: 'hoge',
    stage: 'hoge',
    prod: 'hoge',
    release: 'fuga',
  },
  buildDir: 'dist',
  assetsDir: '',
  projectPath: '',
}

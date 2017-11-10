var API = {
    Config: {
        BaseUrl: "http://api.bidir.staging.gebeya.io/" //REMOTE API
    },
    Service: {
      MFI: 'mfi',
      Auth: 'auth'
    },
    Methods: {
        Auth: {
                Login: 'users/login'
            },
            MFI:'/MFIs/',
            Branch:'/branches/'
        }

};
var ResourceMethods = {
  All: {
      'query': { method: 'GET', isArray: true },
      'get': { method: 'GET' },
      'update': { method: 'PUT' },
      'save': { method: 'POST' },
      'delete': { method: 'DELETE' }
  },
  Readonly: {
      'query': { method: 'GET', isArray: true },
      'get': { method: 'GET' }
  },
  Query: { method: 'GET', isArray: true },
  Get: { method: 'GET' },
  Put: { method: 'PUT' },
  Post: { method: 'POST' },
  Delete: { method: 'DELETE' },
  Search: { 'search': { method: 'POST', isArray: true } }
};

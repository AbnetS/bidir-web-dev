var API = {
    Config: {
        BaseUrl: "http://35.185.118.191:18199" //REMOTE API
        //BaseUrl: "http://localhost:8000/" //LOCAL API

    },
    Methods: {
        Auth: {
                Login: 'users/login'
            },
            MFI:'/MFIs/'
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

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

window.fetch = () =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        authority: "https://localhost:5001",
        client_id: "MoneyTale.Web",
        redirect_uri: "https://localhost:5001/authentication/login-callback",
        post_logout_redirect_uri:
          "https://localhost:5001/authentication/logout-callback",
        response_type: "id_token token",
        scope: "MoneyTale.WebAPI openid profile",
      }),
  });

export const login = (username, password) => {
    return fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password, username: username }), 
    }).then((res) => res.json());
  };

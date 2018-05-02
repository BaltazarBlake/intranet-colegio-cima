async function login(user,password){
  try{
    const response = await fetch(
                            'http://localhost/api-cima/login',
                            {
                            method: "post",
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            body: `user=${user}&password=${password}`,
                          });
    const res = await response.json();
    return res;
  }catch(err){
    console.log(`Error al realizar la petición fetch: ${err}`);
  }
}

export {login}
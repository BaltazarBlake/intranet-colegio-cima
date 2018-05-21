import {host,token} from '../cfg/core';

async function login(user,password){
  try{
    const response = await fetch(
                            `${host}/login`,
                            {
                            method: 'post',
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            body: `user=${user}&password=${password}`,
                          });
    const res = await response.json();
    return res;
  }catch(err){
    console.log(`Error al realizar la petición fetch: ${err}`);
  }
}

async function getTeachers(id){
  try{
    const response = await fetch(
                            `${host}/teachers/${id}`,
                            {
                              method:'get',
                              headers:{'Authorization':localStorage.getItem(token)}
                            }       
    );
    const res = await response.json();
    return res;
  }catch(err){
    console.log(`Error al realizar la petición fetch: ${err}`);
  }
}

async function getChildren(idFamilyGuy){
  try{
    const response = await fetch(
                            `${host}/children/${idFamilyGuy}`,
                            {
                              method:'get',
                              headers:{'Authorization':localStorage.getItem(token)}
                            }
    );
    const res = await response.json();
    return res;
  }catch(err){
    console.log(`Error al realizar la petición fetch: ${err}`);
  }
}

async function getProfile(user){
  try{
    const response = await fetch(
                            `${host}/profile/${user}`,
                            {
                              method:'get',
                              headers:{'Authorization':localStorage.getItem(token)}
                            }
    );
    const res = await response.json();
    return res;
  }catch(err){
    console.log(`Error al realizar la petición fetch: ${err}`);
  }
}

async function getSchedule(idStudentSchool){
  try{
    const response = await fetch(
                            `${host}/schedule/${idStudentSchool}`,
                            {
                              method:'get',
                              headers:{'Authorization':localStorage.getItem(token)}
                            }
    );
    const res = await response.json();
    return res;
  }catch(err){
    console.log(`Error al realizar la petición fetch: ${err}`);
  }
}

async function getJustify(idStudentSchool,date){
  try{
    const response = await fetch(
                            `${host}/justify/${idStudentSchool}/${date}`,
                            {
                              method:'get',
                              headers:{'Authorization':localStorage.getItem(token)}
                            }
    );
    const res = await response.json();
    return res;
  }catch(err){
    console.log(`Error al realizar la petición fetch: ${err}`);
  }
}

async function getClassmates(idStudentSchool){
  try{
    const response = await fetch(
                            `${host}/classmates/${idStudentSchool}`,
                            {
                              method:'get',
                              headers:{'Authorization':localStorage.getItem(token)}
                            }
    );
    const res = await response.json();
    return res;
  }catch(err){
    console.log(`Error al realizar la petición fetch: ${err}`);
  }
}

async function getObservations(idStudentSchool){
  try{
    const response = await fetch(
                            `${host}/observations/${idStudentSchool}`,
                            {
                              method:'get',
                              headers:{'Authorization':localStorage.getItem(token)}
                            }
    );
    const res = await response.json();
    return res;
  }catch(err){
    console.log(`Error al realizar la petición fetch: ${err}`);
  }
}

async function getAssistance(idStudentSchool){
  const response = await fetch(
                          `${host}/assistance/${idStudentSchool}`,
                          {
                            method:'get',
                            headers:{'Authorization':localStorage.getItem(token)}
                          }
  );
  const res = await response.json();
  return res;
}

async function getParents(idStudentSchool) {
  const response = await fetch(
                          `${host}/parents/${idStudentSchool}`,
                          {
                            method: 'get',
                            headers:{'Authorization':localStorage.getItem(token)}
                          }
  );
  const res = await response.json();
  return res;  
}

async function getCourses(idStudentSchool) {
  const response = await fetch(
                        `${host}/cursos/examenes/${idStudentSchool}`,
                          {
                            method: 'get',
                            headers: { 'Authorization': localStorage.getItem(token) }
                          }
  );
  const res = await response.json();
  return res; 
}

export { login,
         getTeachers,
         getChildren,
         getProfile,
         getSchedule,
         getJustify,
         getClassmates,
         getObservations,
         getAssistance,
         getParents,
         getCourses }
import {host,token} from '../cfg/core';

async function login(username,password){
  let user = {username,password};
  try{
    const response = await fetch(
                            `${host}/auth`,
                            {
                            method: 'post',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(user),
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
                            `${host}/student/teachers/${id}`,
                            {
                              method:'get',
                              headers:{'authorization':localStorage.getItem(token)}
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
                            `${host}/family/children/${idFamilyGuy}`,
                            {
                              method:'get',
                              headers:{'authorization':localStorage.getItem(token)}
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
                            `${host}/student/profile/${user}`,
                            {
                              method:'get',
                              headers:{'authorization':localStorage.getItem(token)}
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
                            `${host}/student/schedule/${idStudentSchool}`,
                            {
                              method:'get',
                              headers:{'authorization':localStorage.getItem(token)}
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
                            `${host}/student/justify/${idStudentSchool}/${date}`,
                            {
                              method:'get',
                              headers:{'authorization':localStorage.getItem(token)}
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
                            `${host}/student/classmates/${idStudentSchool}`,
                            {
                              method:'get',
                              headers:{'authorization':localStorage.getItem(token)}
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
                            `${host}/student/observations/${idStudentSchool}`,
                            {
                              method:'get',
                              headers:{'authorization':localStorage.getItem(token)}
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
                          `${host}/student/assistance/${idStudentSchool}`,
                          {
                            method:'get',
                            headers:{'authorization':localStorage.getItem(token)}
                          }
  );
  const res = await response.json();
  return res;
}

async function getParents(idStudentSchool) {
  const response = await fetch(
                          `${host}/student/parents/${idStudentSchool}`,
                          {
                            method: 'get',
                            headers:{'authorization':localStorage.getItem(token)}
                          }
  );
  const res = await response.json();
  return res;  
}

async function getCourses(idStudentSchool) {
  const response = await fetch(
                        `${host}/student/courses/${idStudentSchool}`,
                          {
                            method: 'get',
                            headers: { 'authorization': localStorage.getItem(token) }
                          }
  );
  const res = await response.json();
  return res; 
}

async function getExams(idStudentSchool) {
  const response = await fetch(
                        `${host}/student/exams/${idStudentSchool}`,
                          {
                            method: 'get',
                            headers: { 'authorization': localStorage.getItem(token) }
                          }
  );
  const res = await response.json();
  return res; 
}

async function getParentProfile(idParent) {
  const response = await fetch(
                        `${host}/family/profile/${idParent}`,
                          {
                            method: 'get',
                            headers: { 'authorization': localStorage.getItem(token) }
                          }
  );
  const res = await response.json();
  return res; 
}

async function getPayment(idStudentSchool) {
  console.log('fetch', idStudentSchool);
  const response = await fetch(
                          `${host}/student/payment/${idStudentSchool}`,
                          {
                            method: 'get',
                            headers: { 'authorization': localStorage.getItem(token) }
                          }
  );
  const res = await response.json();
  return res; 
}

async function getEvent(idStudentSchool) {
  const response = await fetch(
                        `${host}/student/events/${idStudentSchool}`,
                          {
                            method: 'get',
                            headers: { 'authorization': localStorage.getItem(token) }
                          }
  );
  const res = await response.json();
  return res; 
}

async function updateFamilyProfile(idFamily,nombre,apellidos,dni,telefono,email,direccion){
  let family = {nombre,apellidos,dni,telefono,email,direccion};
  console.log('famidFamilyily', idFamily);
  const response = await fetch(
                          `${host}/student/parents/${idFamily}`,
                          {
                            method: 'put',
                            headers: { 
                              'authorization': localStorage.getItem(token),
                              'Content-Type' : 'application/json',
                            },
                            body: JSON.stringify(family),
                          }
  );
  const res = await response.json();
  return res;  
}

export { login,
         getTeachers,
         getChildren,
         getProfile,
         getParentProfile,
         getSchedule,
         getJustify,
         getClassmates,
         getObservations,
         getAssistance,
         getParents,
         getCourses,
         getExams,
         getPayment,
         getEvent,
         updateFamilyProfile}
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
                        `${host}/courses/${idStudentSchool}`,
                          {
                            method: 'get',
                            headers: { 'Authorization': localStorage.getItem(token) }
                          }
  );
  const res = await response.json();
  return res; 
}

async function getExams(idStudentSchool) {
  const response = await fetch(
                        `${host}/exams/${idStudentSchool}`,
                          {
                            method: 'get',
                            headers: { 'Authorization': localStorage.getItem(token) }
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
                            headers: { 'Authorization': localStorage.getItem(token) }
                          }
  );
  const res = await response.json();
  return res; 
}

async function getPayment(idStudentSchool) {
  const response = await fetch(
                        `${host}/payment/${idStudentSchool}`,
                          {
                            method: 'get',
                            headers: { 'Authorization': localStorage.getItem(token) }
                          }
  );
  const res = await response.json();
  return res; 
}

async function getEvent(idStudentSchool) {
  const response = await fetch(
                        `${host}/event/${idStudentSchool}`,
                          {
                            method: 'get',
                            headers: { 'Authorization': localStorage.getItem(token) }
                          }
  );
  const res = await response.json();
  return res; 
}

async function updateFamilyProfile(idFamily,name,lastname,dni,phone,email,address){
  const response = await fetch(
                          `${host}/family/profile/${idFamily}`,
                          {
                            method: 'post',
                            headers: { 'Authorization': localStorage.getItem(token) },
                            body: `name=${name}&lastname=${lastname}&dni=${dni}&phone=${phone}&email=${email}&address=${address}`,
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
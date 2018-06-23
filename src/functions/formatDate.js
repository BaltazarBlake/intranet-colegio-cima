export function formatDate(year,month,day){
  let date = '', myMonth = '';
  switch(month){
    case '01'  : {myMonth = 'enero'; break;}
    case '02'  : {myMonth = 'febrero'; break;}
    case '03'  : {myMonth = 'marzo'; break;}
    case '04'  : {myMonth = 'abril'; break;}
    case '05'  : {myMonth = 'mayo'; break;}
    case '06'  : {myMonth = 'junio'; break;}
    case '07'  : {myMonth = 'julio'; break;}
    case '08'  : {myMonth = 'agosto'; break;}
    case '09'  : {myMonth = 'septiembre'; break;}
    case '10' : {myMonth = 'octubre'; break;}
    case '11' : {myMonth = 'noviembre'; break;}
    case '12' : {myMonth = 'diciembre'; break;}
  }
  date = `${day} de ${myMonth}`;
  if(year && year!=''){
    date += ` del ${year}`;
  }
  return date;
}
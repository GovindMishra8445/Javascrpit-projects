function digitalclock() {
  const dayname = document.getElementById("day");
  const monthname = document.getElementById("month");
  const datename = document.getElementById("date");
  const yearname = document.getElementById("year");
  const hourname = document.getElementById("hour");
  const mintuname = document.getElementById("minutes");
  const secondname = document.getElementById("second");
  const showAmname = document.getElementById("show-am-pm");

  let date = new Date();
  let dayn = date.getDay();
  let monthn = date.getMonth();
  let daten = date.getDate();
  const yearn = date.getFullYear();
  let hoursn = date.getHours();
  let minutesn = date.getMinutes();
  let secondn = date.getSeconds();

  switch (dayn) {
    case 0:
      dayn = "Sunday";
      break;
    case 1:
      dayn = "Monday";
      break;
    case 2:
      dayn = "Tuesday";
      break;
    case 3:
      dayn = "Wednesday";
      break;
    case 4:
      dayn = "Thursday";
      break;
    case 5:
      dayn = "Friday";
      break;
    case 6:
      dayn = "Saturday";
      break;
  }

  switch (monthn) {
    case 0:
      monthn = "January";
      break;
    case 1:
      monthn = "February";
      break;
    case 2:
      monthn = "March";
      break;
    case 3:
      monthn = "April";
      break;
    case 4:
      monthn = "May";
      break;
    case 5:
      monthn = "June";
      break;
    case 6:
      monthn = "July";
      break;
    case 7:
      monthn = "August";
      break;
    case 8:
      monthn = "September";
      break;
    case 9:
      monthn = "October";
      break;
    case 10:
      monthn = "November";
      break;
    case 11:
      monthn = "December";
      break;
  }

  let ampm = hoursn >= 12 ? "PM" : "AM";

  if (hoursn > 12) {
    hoursn = hoursn - 12;
  }
  daten = daten < 10 ? "0" + daten : daten;
  hoursn = hoursn < 10 ? "0" + hoursn : hoursn;
  minutesn = minutesn < 10 ? "0" + minutesn : minutesn;
  secondn = secondn < 10 ? "0" + secondn : secondn;

  showAmname.innerHTML = ampm;
  dayname.innerHTML = dayn;
  monthname.innerHTML = monthn;
  datename.innerHTML = daten;
  yearname.innerHTML = yearn;
  hourname.innerHTML = hoursn;
  mintuname.innerHTML = minutesn;
  secondname.innerHTML = secondn;
}
setInterval(digitalclock, 1000);

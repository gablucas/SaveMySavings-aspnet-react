function convertDate(date, type) {
  const normalDate = new Date(date);

  const formatDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const dateFormated = formatDate.format(normalDate)


  if (type === "BR")
  {
    return dateFormated;

  } else if (type === "InputDate")
  {
    let dateInput = dateFormated.split("/");
    return `${dateInput[2]}-${dateInput[1]}-${dateInput[0]}`;
  }
}

export default convertDate;
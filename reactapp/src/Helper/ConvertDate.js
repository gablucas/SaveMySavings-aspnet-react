function convertDate(date, type) {
  const normalDate = new Date(date);

  if (type === "BR")
  {
    return `${normalDate.getDate()}/${normalDate.getMonth() + 1}/${normalDate.getFullYear()}`;

  } else if (type === "InputDate")
  {
    return `${normalDate.getFullYear()}-${normalDate.getMonth() + 1}-${normalDate.getDate()}`;
  }
}

export default convertDate;
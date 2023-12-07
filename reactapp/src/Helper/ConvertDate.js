// function convertDate(date, type) {

//   const normalDate = new Date(date);
//   console.log(new Date(date).toLocaleDateString("pt-BR"))

//   const formatDateFromDb = new Intl.DateTimeFormat('en-US', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   });

//   const dateFormated = formatDateFromDb.format(normalDate)
//   const toInput = dateFormated.split("/");

//   const fromInput = date.split("-")

//   if (type === "BR") {
//     return dateFormated;

//   } else if (type === "InputDate") {
//     return `${toInput[2]}-${toInput[1]}-${toInput[0]}`;

//   } else if (type === "endpoint") {
//     return `${fromInput[0]}-${fromInput[2]}-${fromInput[1]}`;
//   }
// }

function convertDate(date, type) {

  const convertDateFromBd = new Date(date).toLocaleDateString("pt-BR");
  const splitDate = convertDateFromBd.split("/");

  if (type === "BR") {
    return convertDateFromBd;

  } else if (type === "InputDate") {
    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;

  } else if (type === "endpoint") {
    const teste = date.split("-");
    return `${teste[0]}-${teste[1]}-${teste[2]}`
  }
}

export default convertDate;
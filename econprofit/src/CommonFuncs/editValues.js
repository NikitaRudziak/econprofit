export const valueToFixed = (value) => {
  return Number(value).toFixed(2)
}

export const dateToString = (date) => {
  let start = new Date(date);
  return start.getDate() + "-" + (start.getMonth() + 1) + "-" + start.getFullYear();
}

// export const arraySum = (array) => (
//   array.reduce((sum, elem)=> {
//     // console.log(sum)
//     return sum + Number(elem.count)
//   }, 0)
//   // return array
// )

import React from 'react';

// export const placesList = () => (
//   <>
//     <div className={`${style.green} ${style.pos}`}>АЗС</div>
//     <div className={`${style.gray} ${style.pos}`}>Офисы</div>
//     <div className={`${style.yellow} ${style.pos}`}>Торговый объект</div>
//     <div className={`${style.blue} ${style.pos}`}>Спортиивный объект</div>
//     <div className={`${style.red} ${style.pos}`}>Гостиница</div>
//     <div className={`${style.mint} ${style.pos}`}>Объект инфраструктуры</div>
//     <div className={`${style.pint} ${style.pos}`}>Зона отдыха</div>
//     <div className={`${style.b} ${style.pos}`}>Зона каршеринга</div>
//   </>
// )
export const regions = [
  "Минская область",
  "Могилевская область",
  "Гомельская область",
  "Гродненская область",
  "Витебская область",
  "Брестская область",
];

export const companies = [
  "Минскавтозаправка",
  "Минскоблнефтепродукт",
  "Гомельоблнефтепродукт",
  "Гроднооблнефтепродукт",
  "Витебскоблнефтепродукт",
  "Могилевоблнефтепродукт",
  "Брестоблнефтепродукт",
];

export const connectors = [
  "Пистолет Type2",
  "Розетка Type2",
  "CCS",
  "GB/T",
  "Chademo",
];

export const vendors = [
  "TZone",
  "Vityaz",
  "Yablochkov",
  "BKM Holding",
];

export const stationTypes = [
  "AC",
  "DC",
  "AC_DC",
];

export const locationTypes = [
  "АЗС",
  "Офисы",
  "Торговый объект",
  "Спортивный объект",
  "Гостиница",
  "Объект инфраструктуры",
  "Зона отдыха",
  "Зона каршеринга",
];

export const orderTypes = [
  "Убыванию",
  "Возрастанию",
];

export const indicatorTypes = [
  'Выручка',
  'Потребление',
  'Сессии',
  // 'Успешных'
];

export const regionList = () => (
  <>
    <option value="Минская область">Минская область</option>
    <option value="Могилевская область">Могилевская область</option>
    <option value="Гомельская область">Гомельская область</option>
    <option value="Гродненская область">Гродненская область</option>
    <option value="Витебская область">Витебская область</option>
    <option value="Брестская область">Брестская область</option>
  </>
)

export const companyList = () => (
  <>
    <option value="Минскавтозаправка">Минскавтозаправка</option>
    <option value="Минскоблнефтепродукт">Минскоблнефтепродукт</option>
    <option value="Гомельоблнефтепродукт">Гомельоблнефтепродукт</option>
    <option value="Гроднооблнефтепродукт">Гроднооблнефтепродукт</option>
    <option value="Витебскоблнефтепродукт">Витебскоблнефтепродукт</option>
    <option value="Брестоблнефтепродукт">Брестоблнефтепродукт</option>
    <option value="Могилевоблнефтепродукт">Могилевоблнефтепродукт</option>
  </>
)

export const locationTypeList = () => (
  <>
    <option value="АЗС">АЗС</option>
    <option value="Офисы">Офисы</option>
    <option value="Торговый объект">Торговый объект</option>
    <option value="Спортиивный объект">Спортиивный объект</option>
    <option value="Гостиница">Гостиница</option>
    <option value="Объект инфраструктуры">Объект инфраструктуры</option>
    <option value="Зона отдыха">Зона отдыха</option>
    <option value="Зона каршеринга">Зона каршеринга</option>
  </>
)

export const stationTypeList = () => (
  <>
    <option value="AC">AC</option>
    <option value="DC">DC</option>
    <option value="AC/DC">AC/DC</option>
  </>
)

export const connectorList = () => (
  <>
    <option value="Пистолет Type2">Пистолет Type2</option>
    <option value="Розетка Type2">Розетка Type2</option>
    <option value="CCS">CCS</option>
    <option value="GB/T">GB/T</option>
    <option value="Chademo">Chademo</option>
  </>
)

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   TextField,
//   Select,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   OutlinedInput
// } from "@material-ui/core";

// const useStyles = makeStyles(() => ({
//   inputRoot: {
//     width: "300px",
//     borderRadius: "12px",
//     // backgroundColor: "red",
//     backgroundColor: "#F4F4FD",
//     color: "#7A7A95",
//     height: "36px",
//     padding: "16px",
//     boxShadow:
//       "inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7) !important"
//   },
//   inputLabelRoot: {
//     color: "red",
//     fontSize: "12px",
//     fontWeight: 600,
//     lineHeight: "15px",
//     ransform: "scale(1)"
//   },
//   selected: {
//     // borderRadius: "12px",
//     // backgroundColor: "red",
//     "&:focus": {
//       borderRadius: "12px",
//       backgroundColor: "#F4F4FD"
//       // backgroundColor: "red",
//       // borderBottom: "2px solid transparent"
//       // width:"50%",
//     }
//   },
//   underline: {
//     // color: "red",
//     "&::after": {
//       borderBottom: "2px solid transparent",
//       width: "0px"
//     },
//     "&::before": {
//       borderBottom: "2px solid transparent",
//       width: "0px"
//     }
//   },
//   focused: {
//     border: "none",
//     borderRadius: "12px"
//     // "&::after": {
//     //   borderBottom: "2px solid transparent"
//     //   // width:"50%",
//     // },
//     // "&::before": {
//     //   borderBottom: "2px solid transparent"
//     //   // width:"50%",
//     // }
//   }
//   // inputLabelRoot: {
//   // 	color: "red"
//   // },
//   // formHelperTextRoot: {
//   // 	color: "red"
//   // }
// }));
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250
//     }
//   }
// };

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder"
// ];

// const TextInput = (props) => {
//   const classes = useStyles();
//   const [personName, setPersonName] = React.useState([]);

//   return (
//     <Select
//       // labelId="demo-multiple-checkbox-label"
//       // id="demo-multiple-checkbox"
//       // multiple
//       // 	className={
//       // 		"& .MuiSelect-select:focus": {
//       // 				backgroundColor: white,
//       // 		},
//       // },
//       value={personName}
//       disableUnderline={true}
//       sx={{
//         borderRadius: "12px"
//       }}
//       // InputProps={{
//       //   classes: {
//       //     underline: classes.underline,
//       //     root: classes.inputRoot,
//       //     focused: classes.focused
//       //   }
//       // }}
//       // onChange={handleChange}
//       inputProps={{
//         classes: {
//           // underline: classes.underline,
//           root: classes.inputRoot,
//           select: classes.selected
//           // multiline: classes.selected,
//           // focused: classes.selected,
//           // input: classes.selected,
//           // inputMultiline: classes.selected,
//           // formControl: classes.selected,
//           // inputAdornedStart: classes.selected,
//           // inputAdornedEnd: classes.selected,
//           // inputTypeSearch: classes.selected
//         }
//       }}
//       // input={<OutlinedInput label="Tag" />}
//       // renderValue={(selected) => selected.join(", ")}
//       // MenuProps={MenuProps}
//       // MenuProps={{ disablePortal: true }}
//     >
//       {names.map((name) => (
//         <MenuItem key={name} value={name}>
//           <Checkbox checked={personName.indexOf(name) > -1} />
//           <ListItemText primary={name} />
//         </MenuItem>
//       ))}
//     </Select>
//     // <TextField
//     //   // helperText="My Helper Text"
//     //   width="75%"
//     //   InputProps={{
//     //     classes: { underline: classes.underline, root: classes.inputRoot, focused: classes.focused }
//     //   }}
//     //   InputLabelProps={{ classes: { root: classes.inputLabelRoot } }}
//     //   FormHelperTextProps={{ classes: { root: classes.formHelperTextRoot } }}
//     // />
//   );
// };

// export default TextInput;

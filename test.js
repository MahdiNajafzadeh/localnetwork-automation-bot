// const des =
//   "## درخواست تجهیزات\n\n#### نوع تجهیز\n\n```\nنام تجهیز =\n\nدلیل نیاز =  \n```\n\n\n## نوع تخصیص\n\n#### روزانه\n* [ ]  دریافت روزانه\n```\nبازه زمانی مورد نیاز =\n```\n#### موقت\n* [X] دریافت موقت\n* [ ] (تایید سرپرست تیم@)\n\n> تاریخ مورد نظر را در Due date تعیین کنید. ( پایین بخش توضیحات )\n>\n> سرپرست خود را با درون پرانتز بالا منشن کنید. ( درون قسمت `تایید سرپرست تیم` )\n\n\n#### دائمی\n* [ ] دریافت دائمی\n* [ ] (تایید سرپرست تیم@)\n* [ ] (تایید سرپرست تیم شبکه@)";
//
// const keywords = ["## درخواست تجهیزات", "#### نوع تجهیز", "## نوع تخصیص", "#### روزانه", "#### موقت", "#### دائمی"];
// const checkBox = des
//   .split("\n")
//   .map((value) => value.trim())
//   .filter((value) => /[\*,\-] \[[\x,\X, ]\]/.test(value));
//
// console.log(checkBox);
//
// const checkBoxModelRequestChecked = [checkBox[0], checkBox[1], checkBox[3]].filter(
//   (value) => value[3].toLowerCase() === "x"
// );
//
// let modelRequest = "empty";
// if (checkBoxModelRequestChecked.length === 1) {
//   switch (true) {
//     case checkBoxModelRequestChecked[0].includes("روزانه"):
//       modelRequest = "Day";
//       break;
//     case checkBoxModelRequestChecked[0].includes("موقت"):
//       modelRequest = "temp";
//       break;
//     case checkBoxModelRequestChecked[0].includes("دائمی"):
//       modelRequest = "perm";
//       break;
//   }
// }
//
// console.log(modelRequest);























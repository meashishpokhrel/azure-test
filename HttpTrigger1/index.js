module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  let counter = 1;
  const name = req.query.name || (req.body && req.body.name);
  //   let d = new Date(year, month, day, hour, minute, second, millisecond);
  let date_ob = new Date();
  let temp = date_ob;
  let day = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();

  let date = year + "-" + month + "-" + day;

  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  let dateTime =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  //   console.log(dateTime);
  //   const date = new Date();
  const responseMessage = name
    ? "Hello, " +
      name +
      ". This HTTP triggered function executed successfully and uploaded from vscode."
    : "HTTP triggered function executed Successfully !";
  console.log("Hello ! this is ");
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: {
      res: responseMessage,
      date: dateTime,
      counter: counter++,
      params: req,
    },
  };
};

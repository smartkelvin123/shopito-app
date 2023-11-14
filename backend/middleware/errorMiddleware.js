const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorHandler;

// const errorHandler = async (err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);

//   let trace;

//   if (process.env.NODE_ENV === "development") {
//     try {
//       const stackTrace = await import("stack-trace");
//       trace = stackTrace.parse(err);
//     } catch (error) {
//       console.error("Error loading stack-trace module:", error);
//     }
//   }

//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === "development" ? trace : null,
//   });
// };

// module.exports = errorHandler;

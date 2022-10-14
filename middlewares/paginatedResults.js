import User from "../models/User.js";
import bigPromise from "./bigPromise.js";

export const paginatedResults= bigPromise(async(req,res,next)=>{
    const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
   
      // calculating the starting and ending index
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
   
      const results = {};
      if (endIndex < User.length) {
        results.next = {
          page: page + 1,
          limit: limit
        };
      }
   
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        };


      }
      console.log(results.results)
   
    //   results.results = model.slice(startIndex, endIndex);
   
      res.paginatedResults = results;
      next();
})
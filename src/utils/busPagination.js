function paginatedResult (model) {
    return async(req, res, next) => {
        const count = await model.findAndCountAll()
  console.log("model---:", count.count)
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit
    const endIndex = page*limit
    // console.log("--------------",page, limit)
    const results = {}
    if(endIndex < count.count){
        results.next ={
            page: page+1,
            limit:limit
            }
    }
   
    if(startIndex>0){
        results.previous ={
            page: page-1,
            limit:limit
            }
    
        }
            results.results = await model.findAll({limit:limit, offset:page*limit})
        //    console.log("--------------",results) 
            res.paginatedResults = results;
        next();
        } 
     

    

}
export default paginatedResult
const {connect} = require("mongoose")

const conectTodb = async(url)=>{
   await connect(url)
}

module.exports=conectTodb;
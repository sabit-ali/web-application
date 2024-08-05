export default function RefreshToken(){
    try {
        const persistRoot = localStorage.getItem("persist:root");
        if(persistRoot){
          const parsedPersistRoot = JSON.parse(persistRoot);
           const refreshToken = JSON.parse(parsedPersistRoot.refreshToken)
          return refreshToken
        }
      
    } catch (error) {
        console.log("refreshToken error",error)
    }
}
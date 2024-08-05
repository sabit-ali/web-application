export default function Accesstoken(){
    try {
        const persistRoot = localStorage.getItem("persist:root");
        if(persistRoot){
          const parsedPersistRoot = JSON.parse(persistRoot);
          const accessToken = JSON.parse(parsedPersistRoot.token)
          return accessToken
        }
      
    } catch (error) {
        console.log("accessToken error",error)
    }
}
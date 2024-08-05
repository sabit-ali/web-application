

export default function UserAuth() {
    try {
        const persistRoot = localStorage.getItem("persist:root");
        if(persistRoot){
          const parsedPersistRoot = JSON.parse(persistRoot);
          const user = JSON.parse(parsedPersistRoot.user)
          return user
        }
    } catch (error) {
        console.log("UserAuth Error",error)
    }
}



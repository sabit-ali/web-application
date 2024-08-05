import { useParams } from "react-router-dom"


export default function Profile() {
  const params = useParams<{username:string}>()
  return (
    <div>Profile : {params.username}</div>
  )
}

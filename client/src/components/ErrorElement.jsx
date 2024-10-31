import {useRouteError} from "react-router-dom"

const ErrorElement = () => {
const error = useRouteError()

  return (
    <div><h4>There was an Error.</h4></div>
  )
}

export default ErrorElement
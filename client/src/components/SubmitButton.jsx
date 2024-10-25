import { useNavigation } from "react-router-dom"

const SubmitButton = ({formBtn}) => {
  const navigate = useNavigation()
  const isSubmitting = navigate.state === 'submitting'; console.log('hym', navigate);
  

  return (
    <button type="submit" className={`btn btn-block ${formBtn && 'form-btn'}`}>
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
  )
}

export default SubmitButton
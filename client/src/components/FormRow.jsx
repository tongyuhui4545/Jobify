const FormRow = ({type, name, labelText, defaultValue}) => {
  return (
    <div className="form-row">
    <label htmlFor={name} className="form-label">
      {labelText || name}
    </label>
    <input
      type={type}
      name={name}
      className="form-input"
      required
      defaultValue={defaultValue || ""}
    />
  </div>
  )
}

export default FormRow
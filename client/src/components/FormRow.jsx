const FormRow = ({type, name, labelText, defaultValue, onChange}) => {
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
      onChange={onChange}
      defaultValue={defaultValue || ""}
    />
  </div>
  )
}

export default FormRow
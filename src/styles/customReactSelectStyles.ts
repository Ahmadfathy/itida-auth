const customReactSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    border: '2px solid #d1d5db',
    borderRadius: '0.5rem',
    padding: '0.11rem .5rem',
    fontSize: '0.875rem',
    '&:hover': {
      borderColor: '#d1d5db'
    },
    '&:focus': {
      borderColor: '#1e40af',
      outline: '2px solid transparent',
      outlineOffset: '2px'
    }
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#e5e7eb'
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#374151'
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: '#6b7280',
    '&:hover': {
      backgroundColor: '#d1d5db',
      color: '#374151'
    }
  })
}

export default customReactSelectStyles

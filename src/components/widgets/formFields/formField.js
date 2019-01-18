import React from 'react';


import './formField.sass'

const FormField = ({id, formdata, change,}) => {

    const showValidationMessage = () => {
        let errorMessage = null
        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className="input__validation">{formdata.validationMessage}</div>
            )
        }
        
        return errorMessage
    }

    const inputTemplate = (formData) => {
        let formElement = null
        
        switch(formData.element){
            case('input'):
                formElement = (
                    <div className="form__element">
                        {formData.label ? 
                            (<label className="form__label" htmlFor="">{formData.labelText}</label>) 
                            : 
                            null
                        }
                        <input
                            type="text" 
                            {...formData.config}
                            value={formData.value}
                            onBlur= {(event) => change({event, id, blur: true}) }
                            onChange = {(event) => change({event, id, blur: false}) }
                        />
                        {showValidationMessage()}
                    </div>
                )
            break;
            case('textarea'):
                formElement = (
                    <div className="form__element">
                        {formData.label ? 
                            (<label className="form__label" htmlFor="">{formData.labelText}</label>) 
                            : 
                            null
                        }
                        <textarea
                            {...formData.config}
                            onBlur= {(event) => change({event, id, blur: true}) }
                            onChange = {(event) => change({event, id, blur: false}) }
                        />
                        {showValidationMessage()}
                    </div>
                    
                )
            break;
            case('select'):
                formElement = (
                    <div className="form__element">
                        {formData.label ? 
                            (<label className="form__label" htmlFor="">{formData.labelText}</label>) 
                            : 
                            null
                        }
                        <select  name={formData.config.name}
                                 onBlur= {(event) => change({event, id, blur: true}) }
                                 onChange = {(event) => change({event, id, blur: false}) }
                                 value={formData.value}
                        >
                            {
                                formData.optionValues.map((item, i) => (
                                    <option key={i} value={item.val}>{item.text}</option>
                                ))  
                            }
                            
                        </select>
                    </div>
                )
            break;
            default:
                formElement = null;
            break;
        }
        return formElement
        
    }
    
    return (
        inputTemplate(formdata)
    );
};

export default FormField;
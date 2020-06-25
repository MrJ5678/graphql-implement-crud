/*
 * @Author: hhhhhq
 * @Date: 2020-06-23 11:01:34
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-23 11:06:36
 * @Description: file content
 */ 
import { useState } from 'react'

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    callback()
  };

  return {
    onChange,
    onSubmit,
    values
  }
}
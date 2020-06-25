/*
 * @Author: hhhhhq
 * @Date: 2020-06-22 12:57:12
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-23 13:05:15
 * @Description: file content
 */

import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks'
import { useForm } from '../utils/hook'
import { AuthContext } from '../context/auth'
import { Form, Button } from "semantic-ui-react";
import styles from "./Register.module.css";

const Register = (props) => {
  const context = useContext(AuthContext)
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData)
      props.history.push("/")
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values
  })

  function registerUser() {
    addUser()
  }

  return (
    <div className={styles.formContainer}>
      <Form onSubmit={onSubmit} noValidate className={ loading ? 'loading' : '' }>
        <h1 id={styles.pageTitle}>Register</h1>
        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          type="text"
          error={ errors.username ? true : false }
          value={values.username}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="email"
          placeholder="email"
          name="email"
          type="email"
          error={ errors.email ? true : false }
          value={values.email}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="password"
          placeholder="password"
          name="password"
          type="password"
          error={ errors.password ? true : false }
          value={values.password}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="confirmPassword"
          placeholder="comfirmPassword"
          name="confirmPassword"
          type="password"
          error={ errors.password ? true : false }
          value={values.comfirmPassword}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" primary>Register</Button>
      </Form>

      {
        Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {
                Object.values(errors).map((error, i) => (
                  <li key={i}>{ error }</li>
                ))
              }
            </ul>
          </div>
        )
      }
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register($username: String!, $password: String!, $email: String!, $confirmPassword: String!) {
    register(registerInput: {
      username: $username,
      email: $email,
      password: $password,
      confirmPassword: $confirmPassword
    }) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

export default Register;

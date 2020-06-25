/*
 * @Author: hhhhhq
 * @Date: 2020-06-22 12:57:12
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-23 13:02:17
 * @Description: file content
 */

import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks'
import { useForm } from '../utils/hook'
import { AuthContext } from '../context/auth'
import { Form, Button } from "semantic-ui-react";
import styles from "./Register.module.css";

const Login = (props) => {
  const context = useContext(AuthContext)
  const { onChange, onSubmit, values } = useForm(loginUser, {
    username: "",
    password: ""
  })

  const [errors, setErrors] = useState({})

  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData }}) {
      context.login(userData)
      props.history.push("/")
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values
  })

  function loginUser() {
    addUser()
  }

  return (
    <div className={styles.formContainer}>
      <Form onSubmit={onSubmit} noValidate className={ loading ? 'loading' : '' }>
        <h1 id={styles.pageTitle}>Login</h1>
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
          label="password"
          placeholder="password"
          name="password"
          type="password"
          error={ errors.password ? true : false }
          value={values.password}
          onChange={onChange}
        ></Form.Input>
        
        <Button type="submit" primary>Login</Button>
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password,
    ) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

export default Login;

/*
 * @Author: hhhhhq
 * @Date: 2020-06-23 20:06:48
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-24 17:24:59
 * @Description: file content
 */

import React, { useState } from "react";
import gql from "graphql-tag";
import { useForm } from "../utils/hook";
import { useMutation } from "@apollo/react-hooks";
import { Form, Button } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });
  const [error, setError] = useState(null);
  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, { data: { createPost } }) {
      values.body = "";

      const { getPosts } = proxy.readQuery({ query: FETCH_POSTS_QUERY });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: getPosts.concat(createPost) },
      });
    },
    onError(err) {
      console.log(err.graphQLErrors[0].message);
      setError(err.graphQLErrors[0].message);
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
    setError("");
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="hi world"
            name="body"
            error={error ? true : false}
            value={values.body}
            onChange={onChange}
          />
          <Button type="submit" color="teal">
            submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">{error}</ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      createdAt
      body
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;

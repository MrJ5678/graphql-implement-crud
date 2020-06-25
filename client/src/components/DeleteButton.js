/*
 * @Author: hhhhhq
 * @Date: 2020-06-24 16:56:35
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-25 10:48:03
 * @Description: file content
 */

import React, { useState } from "react";
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import MyPopup from '../utils/MyPopup'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrDeleteComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);

      if (!commentId) {
        const { getPosts } = proxy.readQuery({ query: FETCH_POSTS_QUERY });

        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: getPosts.filter(p => p.id !== postId) }
        });
      }

      if (callback) callback();
    },
    variables: { postId, commentId }
  });

  return (
    <>
      <MyPopup content={ commentId ? "delete comment" : "delete post" }>
        <Button
          onClick={() => setConfirmOpen(true)}
          as="div"
          color="red"
          floated="right"
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrDeleteComment}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
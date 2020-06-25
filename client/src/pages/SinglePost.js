/*
 * @Author: hhhhhq
 * @Date: 2020-06-24 11:34:54
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-25 10:26:37
 * @Description: file content
 */

import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Grid, Image, Card, Form } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";
import DeleteButton from "../components/DeleteButton";
import { AuthContext } from "../context/auth";

function SinglePost(props) {
  const postId = props.match.params.postId;

  const [comment, setComment] = useState("");

  const commentInputRef = useRef(null)

  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  function deleteButtonCallback() {
    props.history.push("/");
  }

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    variables: { postId, body: comment },
    update() {
      setComment('')
      commentInputRef.current.blur()
    }
  });

  if (loading) {
    return <p>loading post...</p>;
  } else {
    const { getPost } = data;
    const {
      id,
      likes,
      likeCount,
      username,
      body,
      createdAt,
      commentCount,
      comments,
    } = getPost;

    return (
      <Grid style={{ marginTop: 10 }}>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              size="small"
              float="right"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <CommentButton post={{ id, commentCount }} />
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deleteButtonCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>add a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="your comment"
                        name="comment"
                        ref={commentInputRef}
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                      />
                      <button
                        disabled={comment.trim() === "" ? true : false}
                        className="ui button teal"
                        onClick={submitComment}
                      >
                        submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        username
        id
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        username
        id
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default SinglePost;

/*
 * @Author: hhhhhq
 * @Date: 2020-06-24 16:36:22
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-24 16:54:28
 * @Description: file content
 */

import React from "react";
import { Link } from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react'
import MyPopup from '../utils/MyPopup'

function CommentButton({ post: { id, commentCount } }) {
  return (
    <MyPopup content="comment on post">
      <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
        <Button color="blue" basic>
          <Icon name="comment" />
        </Button>
        <Label basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    </MyPopup>
  );
}

export default CommentButton;

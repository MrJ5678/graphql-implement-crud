/*
 * @Author: hhhhhq
 * @Date: 2020-06-24 09:05:04
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-24 17:20:47
 * @Description: file content
 */ 
import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
{
  getPosts {
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
      id
      username
      createdAt
      body
    }
  }
}
`;
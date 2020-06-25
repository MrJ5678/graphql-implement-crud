/*
 * @Author: hhhhhq
 * @Date: 2020-06-22 20:32:33
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-24 17:16:04
 * @Description: file content
 */ 
import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Card, Image } from 'semantic-ui-react'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import DeleteButton from './DeleteButton'

const PostCard = ({
  post: { username, body, id, createdAt, likeCount, commentCount, likes }
}) => {
  const { user } = useContext(AuthContext)
  
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{ username }</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>{ moment(createdAt).fromNow(true) }</Card.Meta>
        <Card.Description>
          { body }
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <CommentButton post={{ id, commentCount }} />
        { user && user.username === username && 
          <DeleteButton postId={id}/>
        }
      </Card.Content>
    </Card>
  )
}

export default PostCard

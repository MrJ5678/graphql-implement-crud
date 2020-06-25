/*
 * @Author: hhhhhq
 * @Date: 2020-06-22 12:56:55
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-24 17:23:56
 * @Description: file content
 */

import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { AuthContext } from '../context/auth'
import styles from './Home.module.css'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

const Home = () => {
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)

  return (
    <Grid columns={3}>
      <Grid.Row id={styles.pageTitle}>
        <h1>recent posts</h1>
      </Grid.Row>
      <Grid.Row>
        {
          user && 
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        }
        { loading ? 
          (
            <h1>loading posts...</h1>
          ) : 
          ( 
            <Transition.Group>
              {
                data.getPosts && data.getPosts.map(post => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post}/>
                  </Grid.Column>
                ))
              }
            </Transition.Group>
          )
        }
      </Grid.Row>
    </Grid>
  )
}

export default Home;

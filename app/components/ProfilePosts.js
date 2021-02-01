import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Link, useParams } from "react-router-dom"

function ProfilePosts() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`)
        // console.log(response.data)
        setPosts(response.data)
        setIsLoading(false)
      } catch (err) {
        console.log(`Problem! ${err}`)
      }
    }
    fetchPosts()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="list-group">
      {posts.map((post) => {
        const date = new Date(post.createdDate)
        const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        return (
          <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong> <span className="text-muted small">on {dateFormatted}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default ProfilePosts

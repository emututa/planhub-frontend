"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import PostModal from "./post-modal"
import { ThumbsUp, ThumbsDown, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { ShareModal } from "./share-modal"
import { postRoutes } from "@/lib/api/postApi"
import { PostResponse } from "@/lib/Interface/post"

const ITEMS_PER_PAGE = 6

interface PostsListProps {
  userId: string
}

export default function PostsList({ userId }: PostsListProps) {
  const [posts, setPosts] = useState<PostResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingPost, setEditingPost] = useState<PostResponse | null>(null)
  const [sharingPost, setSharingPost] = useState<PostResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [openPost, setOpenPost] = useState<PostResponse | null>(null)

  // Fetch posts from backend
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await postRoutes.getAllPosts()
      setPosts(data)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch posts')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      await postRoutes.deletePost(postId)
      setPosts(posts.filter(p => p.id !== postId))
    } catch (err: any) {
      alert('Failed to delete post: ' + err.message)
    }
  }

  const handleLike = async (postId: string) => {
    console.log('Like post:', postId)
    // TODO: Implement like API when backend is ready
  }

  const handleDislike = async (postId: string) => {
    console.log('Dislike post:', postId)
    // TODO: Implement dislike API when backend is ready
  }

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedPosts = posts.slice(startIndex, endIndex)

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">Loading posts...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 text-lg">Error: {error}</p>
        <Button onClick={fetchPosts} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No posts yet. Be the first to share!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.map((post) => {
          const likeCount = 0 // TODO: Add when backend implements likes
          const dislikeCount = 0 // TODO: Add when backend implements dislikes
          const userLiked = false
          const userDisliked = false
          const isOwner = userId === post.user_id

          // Safely get user name with fallback
          const authorName = post.users?.name || 'Unknown User'

          return (
            <Card
              key={post.id}
              className="overflow-hidden border-border hover:shadow-lg transition-shadow flex flex-col"
            >
              {post.image_url && (
                <img src={post.image_url} alt={post.title} className="w-full h-40 object-cover" />
              )}
              <CardHeader className="pb-3">
                <CardTitle className="text-primary line-clamp-2">{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">by {authorName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent className="space-y-3 flex-grow flex flex-col">
                <p
                  className="text-foreground line-clamp-3 flex-grow cursor-pointer hover:text-primary transition"
                  onClick={() => setOpenPost(post)}
                >
                  {post.description || 'No description'}
                </p>

                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 ${
                      userLiked
                        ? "bg-primary/20 border-primary text-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{likeCount}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDislike(post.id)}
                    className={`flex items-center gap-1 ${
                      userDisliked
                        ? "bg-destructive/20 border-destructive text-destructive"
                        : "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>{dislikeCount}</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setSharingPost(post)}
                    className="flex items-center gap-1 ml-auto bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs font-medium">Share</span>
                  </Button>
                </div>

                {isOwner && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingPost(post)}
                      className="flex-1 border-primary text-primary hover:bg-primary/10"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(post.id)}
                      className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages} ({posts.length} posts total)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {editingPost && (
        <PostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSubmit={() => {
            setEditingPost(null)
            fetchPosts()
          }}
        />
      )}

      {sharingPost && (
        <ShareModal
          title={sharingPost.title}
          url={`${typeof window !== "undefined" ? window.location.origin : ""}/post/${sharingPost.id}`}
          onClose={() => setSharingPost(null)}
        />
      )}

      {openPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-xl">
            <h2 className="text-2xl font-bold text-primary break-words">
              {openPost.title}
            </h2>

            <p className="text-sm text-muted-foreground">
              by {openPost.users?.name || 'Unknown User'} — {new Date(openPost.created_at).toLocaleDateString()}
            </p>

            <p className="text-lg text-foreground whitespace-pre-wrap break-words leading-relaxed">
              {openPost.description || 'No description'}
            </p>

            {openPost.image_url && (
              <img
                src={openPost.image_url}
                alt={openPost.title}
                className="w-full max-h-80 object-cover rounded-lg"
              />
            )}

            <div className="flex items-center justify-center">
              <Button className="w-[300px] mt-4" onClick={() => setOpenPost(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}














// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { useState } from "react"
// import PostModal from "./post-modal"
// import { ThumbsUp, ThumbsDown, Share2, ChevronLeft, ChevronRight } from "lucide-react"
// import { ShareModal } from "./share-modal"

// interface Post {
//   id: string
//   title: string
//   description: string
//   image?: string
//   userId: string
//   userName: string
//   userEmail: string
//   createdAt: string
//   likes: number
//   likedBy?: string[]
//   dislikedBy?: string[]
// }


// const ITEMS_PER_PAGE = 6


// export default function PostsList({
//   posts,
//   userId,
//   onEdit,
//   onDelete,
//   onLike,
//   onDislike,
// }: {
//   posts: Post[]
//   userId: string
//   onEdit: (id: string, data: any) => void
//   onDelete: (id: string) => void
//   onLike: (id: string) => void
//   onDislike: (id: string) => void
// }) {
//   const [editingPost, setEditingPost] = useState<Post | null>(null)
//   const [sharingPost, setSharingPost] = useState<Post | null>(null)
//   const [currentPage, setCurrentPage] = useState(1)

//   const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE)
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
//   const endIndex = startIndex + ITEMS_PER_PAGE
//   const paginatedPosts = posts.slice(startIndex, endIndex)
//   const [openPost, setOpenPost] = useState<Post | null>(null)


//   if (posts.length === 0) {
//     return (
//       <div className="text-center py-16">
//         <p className="text-muted-foreground text-lg">No posts yet. Be the first to share!</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {paginatedPosts.map((post) => {
//           const likeCount = post.likedBy?.length || 0
//           const dislikeCount = post.dislikedBy?.length || 0
//           const userLiked = post.likedBy?.includes(userId)
//           const userDisliked = post.dislikedBy?.includes(userId)

//           return (
//             <Card
//               key={post.id}
//               className="overflow-hidden border-border hover:shadow-lg transition-shadow flex flex-col"
//             >
//               {post.image && (
//                 <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-40 object-cover" />
//               )}
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-primary line-clamp-2">{post.title}</CardTitle>
//                 <p className="text-sm text-muted-foreground mt-1">by {post.userName}</p>
//                 <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
//               </CardHeader>
//               <CardContent className="space-y-3 flex-grow flex flex-col">
//                 {/* <p className="text-foreground line-clamp-3 flex-grow">{post.description}</p> */}
//                 <p
//   className="text-foreground line-clamp-3 flex-grow cursor-pointer hover:text-primary transition"
//   onClick={() => setOpenPost(post)}
// >
//   {post.description}
// </p>


//                 <div className="flex items-center gap-2 pt-3 border-t border-border">
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => onLike(post.id)}
//                     className={`flex items-center gap-1 ${
//                       userLiked
//                         ? "bg-primary/20 border-primary text-primary"
//                         : "border-border text-muted-foreground hover:border-primary hover:text-primary"
//                     }`}
//                   >
//                     <ThumbsUp className="w-4 h-4" />
//                     <span>{likeCount}</span>
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => onDislike(post.id)}
//                     className={`flex items-center gap-1 ${
//                       userDisliked
//                         ? "bg-destructive/20 border-destructive text-destructive"
//                         : "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
//                     }`}
//                   >
//                     <ThumbsDown className="w-4 h-4" />
//                     <span>{dislikeCount}</span>
//                   </Button>
//                   <Button
//                     size="sm"
//                     onClick={() => setSharingPost(post)}
//                     className="flex items-center gap-1 ml-auto bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
//                   >
//                     <Share2 className="w-4 h-4" />
//                     <span className="text-xs font-medium">Share</span>
//                   </Button>
//                 </div>

//                 {userId === post.userId && (
//                   <div className="flex gap-2 pt-2">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => setEditingPost(post)}
//                       className="flex-1 border-primary text-primary hover:bg-primary/10"
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => onDelete(post.id)}
//                       className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>

//       {totalPages > 1 && (
//         <div className="flex items-center justify-between pt-8 border-t border-border">
//           <p className="text-sm text-muted-foreground">
//             Page {currentPage} of {totalPages} ({posts.length} posts total)
//           </p>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="flex items-center gap-1"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               Previous
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
//               disabled={currentPage === totalPages}
//               className="flex items-center gap-1"
//             >
//               Next
//               <ChevronRight className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       )}

//       {editingPost && (
//         <PostModal
//           post={editingPost}
//           onClose={() => setEditingPost(null)}
//           onSubmit={(data) => {
//             onEdit(editingPost.id, data)
//             setEditingPost(null)
//           }}
//         />
//       )}

//       {sharingPost && (
//         <ShareModal
//           title={sharingPost.title}
//           url={`${typeof window !== "undefined" ? window.location.origin : ""}/post/${sharingPost.id}`}
//           onClose={() => setSharingPost(null)}
//         />
//       )}

//       {openPost && (
//   <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-xl">
      
//       {/* Title */}
//       <h2 className="text-2xl font-bold text-primary break-words">
//         {openPost.title}
//       </h2>

//       {/* Author */}
//       <p className="text-sm text-muted-foreground">
//         by {openPost.userName} — {new Date(openPost.createdAt).toLocaleDateString()}
//       </p>

//       {/* Description */}
//       <p className="text-lg text-foreground whitespace-pre-wrap break-words leading-relaxed">
//         {openPost.description}
//       </p>

//       {/* Optional Image */}
//       {openPost.image && (
//         <img
//           src={openPost.image}
//           alt={openPost.title}
//           className="w-full max-h-80 object-cover rounded-lg"
//         />
//       )}

//       {/* Close Button */}
//       <div className ="flex  items-center justify-center">
//       <Button className="w-[300px]   mt-4" onClick={() => setOpenPost(null)}>
//         Close
//       </Button>
//       </div>
//     </div>
//   </div>
// )}



//     </div>
//   )
// }

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          title: string
          slug: string
          content: string
          excerpt: string
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          slug: string
          content: string
          excerpt: string
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: number
          name: string
          description: string
          stack: string
          link: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          stack: string
          link: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          stack?: string
          link?: string
          created_at?: string
        }
      }
    }
  }
}

export type Post = Database['public']['Tables']['posts']['Row']
export type Project = Database['public']['Tables']['projects']['Row']

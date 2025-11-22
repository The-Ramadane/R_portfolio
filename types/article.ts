/* eslint-disable camelcase */
export interface Article {
  id: string
  type_of: string
  title: string
  description: string
  readable_publish_date: string
  slug: string
  url: string
  tag_list: string[] | string
  tags?: string[] | string
  social_image: string
  reading_time_minutes: number
  published_at: string
  user: {
    name: string
    profile_image: string
  }
}

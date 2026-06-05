import type { AgentValue } from "@/types/agent.type"

import BlogResearch from "./BlogResearch/BlogResearch"
import BlogSearch from "./BlogSearch/BlogSearch"
import BlogSidebarFeaturedAgent from "./BlogSidebarFeaturedAgent/BlogSidebarFeaturedAgent"
import BlogSidebarPodcast from "./BlogSidebarPodcast/BlogSidebarPodcast"
import BlogSidebarVideo from "./BlogSidebarVideo/BlogSidebarVideo"
import BlogSocials from "./BlogSocials/BlogSocials"
import BlogTags from "./BlogTags/BlogTags"

interface IProps {
  agentData: AgentValue
}

const BlogSidebar: React.FC<IProps> = ({ agentData }) => {
  return (
    <section className="col-span-full grid w-full items-start justify-items-start gap-6 md:col-span-4 lg:col-span-3">
      <BlogResearch />
      <BlogSearch />
      <BlogTags />
      {(agentData.facebook ||
        agentData.instagram ||
        agentData.twitter ||
        agentData.youtube) && <BlogSocials agentData={agentData} />}
      <BlogSidebarVideo />
      <BlogSidebarPodcast />
      <BlogSidebarFeaturedAgent />
    </section>
  )
}

export default BlogSidebar

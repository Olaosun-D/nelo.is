import { graphql } from 'gatsby'
import React, { PureComponent } from 'react'
import get from 'lodash/get'
import { Calendar, Clock, Tag } from 'react-feather'

import ForHire from '../sections/ForHire'
import Subscribe from '../sections/Subscribe'
import SEO from '../components/SEO'
import Banner, { Type, Title, Subtitle, Meta } from '../components/Banner'
import Article from '../components/Article'
import ProjectDetails from '../components/Article/ProjectDetails'
import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'
import Text from '../components/Text'

class PostTemplate extends PureComponent {
  render() {
		const { history, location } = this.props
    const post = this.props.data.markdownRemark
		const cover = get(post, 'frontmatter.cover.childImageSharp.fluid')
    const siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const image =
      siteUrl + get(post, 'frontmatter.ogImage.childImageSharp.fixed.src')
    const {
      model,
      title,
      subtitle,
      category,
      date,
      description,
      type,
      month,
      client,
      roles,
      stack
    } = post.frontmatter

    const meta = {
      image: image,
      title: title + (model === 'project' ? ` – ${subtitle}` : ''),
      description: model === 'project' ? description : subtitle,
      siteTitle: siteTitle
    }

    return (
      <Layout {...{history, location}}>
        <Wrapper>
          <SEO {...meta} />
          <Banner cover={cover}>
            <Type>{type}</Type>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
            {model !== 'project' && (
              <Meta>
                <Text display={['none', 'none', 'inline']}>
                  <Tag /> {category}
                </Text>
                <Text>
                  <Clock />
                  {post.timeToRead} m<Text display={['none', 'inline']}>
                    in{post.timeToRead > 1 ? 's' : ''}
                  </Text>
                </Text>
                <Text>
                  <Calendar />
                  {date.substr(0, date.length - 6)}
                  <Text display={['none', 'inline']}>{date.substr(-6)}</Text>
                </Text>
              </Meta>
            )}
          </Banner>
          {model === 'project' && (
            <ProjectDetails
              month={month}
              client={client}
              description={description}
              roles={roles}
              stack={stack}
            />
          )}
          <Article
            wrapper={model === 'project' ? 'normal' : 'narrow'}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Wrapper>
        {model === 'project' ? <ForHire /> : <Subscribe />}
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      frontmatter {
        title
        subtitle
        cover {
          childImageSharp {
            fluid(
              duotone: { highlight: "#f5f8fa", shadow: "#293742" }
              toFormat: JPG
              jpegProgressive: true
            ) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        ogImage: cover {
          childImageSharp {
            fixed(
              width: 1200
              height: 630
              toFormat: JPG
              jpegProgressive: true
            ) {
              src
            }
          }
        }
        model
        category
        type
        date(formatString: "MMM D, YYYY")
        month: date(formatString: "MMMM YYYY")

        client
        description
        roles
        stack
      }
    }
  }
`
